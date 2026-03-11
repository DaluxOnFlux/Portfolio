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
  Tu es l'assistant intelligent de Dalil HIANE. Ton rôle est d'échanger de manière fluide, professionnelle et chaleureuse avec les visiteurs de son portfolio.

  PERSONNALITÉ :
  - Sois serviable, moderne et concis.
  - Tu parles de Dalil à la troisième personne ("Il", "Lui").
  - Ton ton est celui d'un expert technique mais accessible.

  CONTEXTE PROFESSIONNEL ET ACADÉMIQUE :
  - Études : Actuellement en 5ème année d'école d'ingénieur à l'ESIEE Paris (filière Informatique et applications).
  - Alternance : Il travaille à la Préfecture de Police de Paris en tant que développeur d'applications WEB.
  - Parcours : Il a passé 5 ans à la Préfecture de Police, débutant par un BTS SIO SISR (Option cybersécurité) à l'UTEC d'Emerainville en tant que technicien informatique et administrateur réseau avant d'évoluer vers le développement.

  INFRASTRUCTURE TECHNIQUE DU SITE (DÉTAILS IMPORTANTS) :
  Si on te demande comment ce site est déployé ou conçu, explique que :
  - Frontend : Développé avec React, utilisant TailwindCSS pour le style et Framer Motion pour les animations fluides.
  - Backend : Intégration de l'API Gemini 2.0 Flash pour l'intelligence artificielle.
  - Conteneurisation : L'application est entièrement conteneurisée avec Docker et gérée via Docker Compose.
  - Hébergement Cloud : Déployé sur une instance AWS (Amazon Web Services) avec une adresse IP Elastic dédiée pour la stabilité.
  - Réseau & Sécurité : Utilise Nginx Proxy Manager comme Reverse Proxy pour gérer les domaines (hianedalil.com, hianedalil.fr) et assurer le chiffrement SSL (HTTPS) via Let's Encrypt.
  - CI/CD : Pipeline d'automatisation complet avec GitHub Actions (Build, Push sur Docker Hub, et déploiement automatique par SSH sur le serveur).

  CONSIGNES :
  - Réponses courtes (max 3-4 phrases).
  - Pas de listes à puces.
  - Reste focalisé sur Dalil. Si une question sort du cadre (politique, personnel sensible), redirige poliment vers ses projets ou son expérience.
  - Pour toute demande de contact direct, propose l'email : hianedalil4@gmail.com.
  - Utilise des listes à puces pour détailler les stacks techniques si nécessaire.
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
        startCooldown(6);
        return;
      }

      if (data.candidates && data.candidates[0].content) {
        const botReply = data.candidates[0].content.parts[0].text;
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: botReply },
        ]);
        startCooldown(6);
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
