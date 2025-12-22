import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, SendHorizontal, Bot, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Bonjour ! Je suis l'assistant de Dalil. Posez-moi une question sur son parcours ou ses projets !",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Suggestions rapides
  const suggestions = [
    "Quel est son parcours ?",
    "Ses compétences techniques ?",
    "Comment est fait ce site ?",
    "Est-il disponible ?",
  ];

  const handleSend = async (textToSend = input) => {
    const messageText = typeof textToSend === "string" ? textToSend : input;
    if (!messageText.trim() || cooldown > 0) return;

    const userMessage = { role: "user", content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const API_KEY = "AIzaSyCq8-7UWoAsB5mtz39A3C4PbAi-l1DD_0s";

    const systemContext = `
      Tu es l'assistant virtuel de Dalil HIANE. 
      IMPORTANT : Tu ne dois JAMAIS utiliser la première personne ("Je", "Me", "Mon"). 
      Tu dois toujours parler de Dalil à la troisième personne ("Il", "Lui", "Dalil").

      RÉPONSES COURTES : Max 3-4 lignes. Pas de pavés.
      FORMATAGE : Utilise des tirets (-) pour les listes.

      RÈGLES DE SÉCURITÉ ET PÉRIMÈTRE :
      - Ton seul et unique but est de renseigner sur Dalil HIANE (parcours, projets, compétences).
      - Si une question concerne la politique, la religion, les conflits internationaux (ex: Israël, Palestine), ou tout sujet polémique, tu dois répondre poliment : "Désolé, en tant qu'assistant de Dalil, je suis uniquement programmé pour répondre aux questions concernant son parcours professionnel et ses projets."
      - Ne donne jamais d'avis personnel.
      - Si une question est hors sujet (météo, sport), réponds poliment que tu ne réponds qu'aux questions sur Dalil.

      INFOS SUR LA RÉALISATION DU PORTFOLIO :
      Dalil a conçu ce portfolio comme une application React moderne. Il est entièrement conteneurisé avec Docker et déployé sur un VPS Google Cloud. Pour automatiser les mises à jour, il a mis en place un pipeline CI/CD avec GitHub Actions. Côté design, il utilise Framer Motion pour les animations et TailwindCSS pour le style.
      
      INFOS PERSONNELLES :
      - Localisation : Dalil habite à Chelles.
      - Contact : hianedalil4@gmail.com | LinkedIn: hianeda | GitHub: DaluxOnFlux.

      PARCOURS :
      - Actuel (2023-2026) : Ingénieur Informatique à l'ESIEE Paris, en alternance à la Préfecture de Police de Paris.
      - Expérience : Déjà 5 ans d'expérience à la Préfecture de Police de Paris (évolution de technicien à ingénieur).

      COMPÉTENCES (SKILLS) :
      - Front End : Next.js, React, Vue.js, TailwindCSS.
      - Back End & Data : Node.js, PHP, Python, MySQL, MongoDB.
      - DevOps & Infra : Docker, Kubernetes, Linux, Git/GitHub.

      PROJETS :
      Système Solaire OpenGL, Laboratoire BTS SIO SISR, Whippin-World (Unity), PacMan-IA, GStreamer Streamer, ARM Assembly Motor Control.

      INFOS CLÉS POUR RECRUTEURS :
      - Disponibilité : Diplômé en 2026, ouvert aux opportunités en CDI après l'alternance.
      - Anglais : Niveau Ingénieur (TOEIC validé).
      - Travail d'équipe : Habitué au travail en équipe à la Préfecture de Police.
    `;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: `${systemContext}\n\nQuestion : ${messageText}` },
                ],
              },
            ],
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_LOW_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_LOW_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_LOW_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_LOW_AND_ABOVE",
              },
            ],
            generationConfig: { temperature: 0.4, maxOutputTokens: 200 },
          }),
        }
      );

      const data = await response.json();

      if (data.candidates && data.candidates[0].finishReason === "SAFETY") {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Désolé, je ne peux pas répondre à cette question car elle sort du cadre professionnel de ce portfolio.",
          },
        ]);
        startCooldown(10);
        return;
      }

      if (data.candidates && data.candidates[0].content) {
        const botReply = data.candidates[0].content.parts[0].text;
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: botReply },
        ]);
        startCooldown(10);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Erreur de connexion au serveur." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const startCooldown = (seconds) => {
    setCooldown(seconds);
    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="chatbot-wrapper">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-window glass-card"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
          >
            <div className="chat-header">
              <img
                src="/images/Gemini.svg"
                alt="Gemini"
                style={{ width: "24px", height: "24px" }}
              />
              <span>Assistant de Dalil</span>
              <X
                onClick={() => setIsOpen(false)}
                style={{ cursor: "pointer" }}
              />
            </div>

            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`message ${msg.role}`}>
                  {msg.content}
                </div>
              ))}
              {isLoading && (
                <div className="message assistant">Réflexion...</div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* SECTION SUGGESTIONS */}
            {!isLoading && cooldown === 0 && (
              <div className="chat-suggestions">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(s)}
                    className="suggestion-btn"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div className="chat-input">
              <input
                value={input}
                disabled={isLoading || cooldown > 0}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder={
                  cooldown > 0
                    ? `Attendez ${cooldown}s...`
                    : "Votre question..."
                }
              />
              <button
                onClick={() => handleSend()}
                className="chat-send-btn"
                disabled={isLoading || cooldown > 0}
              >
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : cooldown > 0 ? (
                  <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                    {cooldown}
                  </span>
                ) : (
                  <SendHorizontal size={18} />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button className="chat-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <X />
        ) : (
          <img
            src="/images/Gemini.svg"
            alt="Gemini"
            style={{ width: "30px", height: "30px" }}
          />
        )}
      </button>
    </div>
  );
};

export default ChatBot;
