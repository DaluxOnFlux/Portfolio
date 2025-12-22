import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Terminal = ({ isOpen, onClose }) => {
  const [history, setHistory] = useState([
    { type: "output", content: "Welcome to Dalil-OS v5.0.1" },
    { type: "output", content: "Type 'help' to see available commands." },
    { type: "output", content: "" },
  ]);
  const [input, setInput] = useState("");
  const [currentDir, setCurrentDir] = useState("~");
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const fileSystem = {
    "~": { type: "dir", content: ["projects/", "skills/", "about_me.txt"] },
    projects: {
      type: "dir",
      content: [
        "opengl_solar_system.txt",
        "bts_sio_lab.txt",
        "whippin_world.txt",
        "pacman_ia.txt",
        "quiz_app.txt",
        "gstreamer_recorder.txt",
      ],
    },
    skills: { type: "dir", content: ["competences.txt"] },
  };

  const fileContent = {
    "about_me.txt":
      "Dalil est passionné par le DevOps, le développement FullStack et les systèmes bas niveau (OpenGL/Assembleur).",
    "competences.txt":
      "FRONT: Next.js, React, Vue.js, Tailwind\nBACK: Node.js, PHP, Python, MySQL\nDEVOPS: Docker, Kubernetes, Linux, CI/CD",
    "opengl_solar_system.txt":
      "NOM: Système Solaire OpenGL\nDESC: Simulation 3D de shaders.\nURL: https://github.com/DaluxOnFlux/ProjetOpenGL",
    "bts_sio_lab.txt":
      "NOM: Laboratoire BTS SIO SISR\nDESC: Admin réseau, VPN, Cisco, Windows Server.\nURL: https://github.com/DaluxOnFlux/Projets-TP-en-BTS-SIO-SISR",
    "whippin_world.txt":
      "NOM: Whippin-World\nDESC: Jeu Unity avec shaders personnalisés.\nURL: https://github.com/DaluxOnFlux/Whippin-World",
    "pacman_ia.txt":
      "NOM: PacMan-IA\nDESC: Algorithmes de recherche IA en Python.\nURL: https://github.com/DaluxOnFlux/PacMan-IA-Projet-E3",
    "quiz_app.txt":
      "NOM: Quiz App\nDESC: Application FullStack Vue3/Flask.\nURL: https://github.com/DaluxOnFlux/quiz_app",
    "gstreamer_recorder.txt":
      "NOM: GStreamer Streamer & Recorder\nDESC: Capture temps réel et diffusion UDP/RTP.\nURL: https://github.com/DaluxOnFlux/gst-screen-recorder",
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleTerminalClick = () => inputRef.current?.focus();

  // --- LOGIQUE D'AUTO-COMPLÉTION ---
  const handleTabCompletion = () => {
    const parts = input.trim().split(" ");
    if (parts.length < 2) return; // Il faut au moins une commande et un début de nom

    const command = parts[0];
    const partialName = parts[1].toLowerCase();

    // On récupère le contenu du dossier actuel
    const dirKey = currentDir === "~" ? "~" : currentDir;
    const availableItems = fileSystem[dirKey].content;

    // On cherche les correspondances (on enlève le "/" final pour la recherche si c'est un dossier)
    const matches = availableItems.filter((item) =>
      item.toLowerCase().replace("/", "").startsWith(partialName)
    );

    if (matches.length === 1) {
      // S'il n'y a qu'une seule possibilité, on complète l'input
      const completedName = matches[0];
      setInput(`${command} ${completedName}`);
    }
  };

  const commands = {
    help: () =>
      "Commands: ls, cd [dir], cat [file], clear, whoami, contact, exit",
    whoami: () =>
      "Dalil Hiane - Ingénieur Informatique @ ESIEE Paris & Préfecture de Police.",
    contact: () => "Email: hianedalil4@gmail.com | GitHub: DaluxOnFlux",
    clear: () => {
      setHistory([]);
      return null;
    },
    exit: () => {
      onClose();
      return null;
    },
    ls: () => {
      const dir = currentDir === "~" ? "~" : currentDir;
      return fileSystem[dir].content.join("    ");
    },
    cd: (arg) => {
      const cleanArg = arg?.replace("/", "");
      if (!cleanArg || cleanArg === "~" || cleanArg === "..") {
        setCurrentDir("~");
        return null;
      }
      if (
        currentDir === "~" &&
        fileSystem[cleanArg] &&
        fileSystem[cleanArg].type === "dir"
      ) {
        setCurrentDir(cleanArg);
        return null;
      }
      return `cd: no such directory: ${arg}`;
    },
    cat: (arg) => {
      if (!arg) return "Usage: cat [filename]";
      if (fileContent[arg]) return fileContent[arg];
      return `cat: ${arg}: No such file`;
    },
  };

  const handleKeyDown = (e) => {
    // INTERCEPTION DE LA TOUCHE TAB
    if (e.key === "Tab") {
      e.preventDefault(); // Empêche de changer de focus
      handleTabCompletion();
    }

    if (e.key === "Enter") {
      const parts = input.trim().split(" ");
      const cmd = parts[0].toLowerCase();
      const arg = parts[1];

      let result = commands[cmd]
        ? commands[cmd](arg)
        : cmd !== ""
        ? `command not found: ${cmd}`
        : "";
      const promptInfo = `dalil@portfolio:${currentDir}$`;

      const newHistory = [
        ...history,
        { type: "command", prompt: promptInfo, content: input },
      ];
      if (result !== null) newHistory.push({ type: "output", content: result });

      if (cmd === "clear") setHistory([]);
      else setHistory(newHistory);
      setInput("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="terminal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="terminal-window" onClick={handleTerminalClick}>
            <div
              className="terminal-header"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="terminal-buttons">
                <span className="t-btn red" onClick={onClose}>
                  <X size={8} strokeWidth={4} />
                </span>
                <span className="t-btn yellow"></span>
                <span className="t-btn green"></span>
              </div>
              <div className="terminal-title">
                dalil@portfolio: {currentDir}
              </div>
            </div>

            <div className="terminal-body">
              {history.map((line, i) => (
                <div key={i} className="terminal-line">
                  {line.type === "command" ? (
                    <>
                      <span style={{ color: "#6366f1", fontWeight: "bold" }}>
                        {line.prompt}
                      </span>
                      <span style={{ color: "#ffffff", marginLeft: "10px" }}>
                        {line.content}
                      </span>
                    </>
                  ) : (
                    <span style={{ color: "#a855f7", whiteSpace: "pre-wrap" }}>
                      {line.content}
                    </span>
                  )}
                </div>
              ))}
              <div className="terminal-input-line">
                <span style={{ color: "#6366f1", fontWeight: "bold" }}>
                  dalil@portfolio:{currentDir}$
                </span>
                <input
                  ref={inputRef}
                  autoFocus
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown} // Utilisation du nouveau handler
                  style={{
                    color: "#ffffff",
                    marginLeft: "10px",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    flex: 1,
                    fontFamily: "inherit",
                  }}
                />
              </div>
              <div ref={scrollRef} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Terminal;
