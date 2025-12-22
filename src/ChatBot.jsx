import React, { useState } from "react";
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

  const handleSend = async () => {
    if (!input.trim() || cooldown > 0) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const API_KEY = "AIzaSyCq8-7UWoAsB5mtz39A3C4PbAi-l1DD_0s";

    // Contexte pro pour ton portfolio ESIEE
    const systemContext = `
      Tu es l'assistant virtuel de Dalil HIANE. 
      IMPORTANT : Tu ne dois JAMAIS utiliser la première personne ("Je", "Me", "Mon"). 
      Tu dois toujours parler de Dalil à la troisième personne ("Il", "Lui", "Dalil").

      RÉPONSES COURTES : Max 3-4 lignes. Pas de pavés.
      FORMATAGE : Utilise des tirets (-) pour les listes.

      RÈGLES DE SÉCURITÉ ET PÉRIMÈTRE :
      - Ton seul et unique but est de renseigner sur Dalil HIANE (parcours, projets, compétences).
      - Si une question concerne la politique, la religion, les conflits internationaux (ex: Israël, Palestine), ou tout sujet polémique/hors sujet, tu dois répondre poliment : "Désolé, en tant qu'assistant de Dalil, je suis uniquement programmé pour répondre aux questions concernant son parcours professionnel et ses projets."
      - Ne donne jamais d'avis personnel sur aucun sujet.
      - Si une question est hors sujet (ex: météo, sport, divertissement), réponds poliment que tu ne peux répondre qu'aux questions sur Dalil.
      - Ne divulgue jamais d'informations personnelles non listées ici.
      - Si une question demande des informations non listées ici, réponds poliment que tu ne peux répondre qu'aux questions sur Dalil.

      INFOS SUR LA RÉALISATION DU PORTFOLIO :
      Dalil a conçu ce portfolio comme une application React moderne. Il est entièrement conteneurisé avec Docker et déployé sur un VPS Google Cloud. Pour automatiser les mises à jour, il a mis en place un pipeline CI/CD avec GitHub Actions. Côté design, il utilise Framer Motion pour les animations et TailwindCSS pour le style.
      
      INFOS PERSONNELLES :
      - Localisation : Dalil habite à Chelles.
      - Contact : hianedalil4@gmail.com | LinkedIn: hianeda | GitHub: DaluxOnFlux.

      PARCOURS :
      - Actuel (2023-2026) : Ingénieur Informatique à l'ESIEE Paris, en alternance à la Préfecture de Police de Paris.
      - Passé (2021-2023) : BTS SIO SISR (Option Cybersécurité) à l'UTEC Emerainville, en alternance à la Préfecture de Police.
      - Passé (2018-2021) : BAC Général (Maths, SI) au Lycée Gaston Bachelard.
      - Expérience : Déjà 5 ans d'expérience à la Préfecture de Police de Paris.

      COMPÉTENCES (SKILLS) :
      - Front End : Next.js, React, Vue.js, TailwindCSS, JavaScript.
      - Back End & Data : Node.js, PHP, Python, MySQL, MongoDB, Pandas.
      - DevOps & Infra : Docker, Kubernetes, Linux, Bash/Shell, Git/GitHub.
      - Infrastructure Portfolio : Déployé sur VPS Google Cloud, Conteneurisé avec Docker, CI/CD GitHub Actions.

      PROJETS RÉALISÉS :
      1. Système Solaire OpenGL (C, C++, OpenGL) : Simulation 3D de shaders.
      2. Laboratoire BTS SIO SISR : Admin réseau, VPN, Cisco, Windows Server.
      3. Whippin-World (Unity, C#, ShaderLab) : Jeu vidéo avec shaders personnalisés.
      4. PacMan-IA (Python) : Algorithmes de recherche IA.
      5. Space Invaders (C#, OOP) : Patterns de conception.
      6. Quiz App (Vue3, Flask, SQLite).
      7. GStreamer Streamer & Recorder : Capture temps réel et diffusion UDP/RTP.
      8. ARM Assembly Motor Control : Bas niveau sur Cortex-M4.
      9. US Health Data Dashboard : Data engineering avec Python (Dash/Pandas).

      DIRECTIVES : 
      - Si on demande où il travaille : "À la Préfecture de Police de Paris".
      - Si on demande où il habite : "À Chelles".
      - Sois fier de tes 5 ans d'expérience à la Préfecture.

    INFOS CLÉS POUR RECRUTEURS :
      - Évolution à la Préfecture de Police : Dalil y est depuis 5 ans. Il a commencé comme Technicien informatique/Admin réseau (pendant son BTS SIO) et a évolué vers un poste de Développeur d'applications WEB / Ingénieur DevOps (pendant son cycle ingénieur à l'ESIEE). Cela démontre sa fidélité et sa forte progression technique.
      - Disponibilité : Il termine son cursus en 2026 et sera ouvert à des opportunités en CDI dès la fin de son contrat d'alternance.
      - Anglais : Niveau Ingénieur (préparation/validation du TOEIC à l'ESIEE Paris).
      - Travail d'équipe : Il a l'habitude de travailler en équipe au sein de la Préfecture, tout en étant très autonome sur ses projets personnels (comme ce portfolio).
      - Mise en production : Il maîtrise le cycle de vie complet d'une application. Il gère ses propres mises en production via Docker, des pipelines CI/CD GitHub Actions et le déploiement sur VPS Google Cloud.
    `;

    try {
      // UTILISATION DU NOM DE MODÈLE "LATEST" VU DANS TON JSON
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: `${systemContext}\n\nQuestion : ${input}` }],
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
            generationConfig: {
              temperature: 0.4, // On baisse la température pour qu'il soit moins "créatif" et reste sur ses rails
              maxOutputTokens: 200,
            },
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      if (data.candidates && data.candidates[0].finishReason === "SAFETY") {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Désolé, je ne peux pas répondre à cette question car elle sort du cadre professionnel de ce portfolio.",
          },
        ]);
        startCooldown(10); // On lance quand même le cooldown pour éviter le spam
        return;
      }

      // 2. Si c'est OK (pas de blocage), on affiche la réponse
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
        { role: "assistant", content: "⚠️ Note : " + error.message },
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
            </div>
            <div className="chat-input">
              <input
                value={input}
                disabled={isLoading || cooldown > 0} // On bloque l'input
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder={
                  cooldown > 0
                    ? `Attendez ${cooldown}s...`
                    : "Votre question..."
                }
              />
              <button
                onClick={handleSend}
                className="chat-send-btn"
                disabled={isLoading || cooldown > 0} // On bloque le bouton
              >
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : cooldown > 0 ? (
                  <span style={{ fontSize: "12px" }}>{cooldown}</span>
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
