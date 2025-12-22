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
  const [isWaitingForPassword, setIsWaitingForPassword] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Logo découpé en lignes pour l'affichage côte à côte
  const asciiLogoLines = [
    "                    ",
    "                    ",
    "  ██████╗  ██╗  ██╗ ",
    "  ██╔══██╗ ██║  ██║ ",
    "  ██║  ██║ ███████║ ",
    "  ██║  ██║ ██╔══██║ ",
    "  ██████╔╝ ██║  ██║ ",
    "  ╚═════╝  ╚═╝  ╚═╝ ",
    "                    ",
    "   { DALIL-OS v5 }  ",
  ];

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

  const handleTabCompletion = () => {
    if (isWaitingForPassword) return;
    const parts = input.trim().split(" ");
    if (parts.length < 2) return;

    const command = parts[0];
    const partialName = parts[1].toLowerCase();
    const dirKey = currentDir === "~" ? "~" : currentDir;
    const availableItems = fileSystem[dirKey].content;

    const matches = availableItems.filter((item) =>
      item.toLowerCase().replace("/", "").startsWith(partialName)
    );

    if (matches.length === 1) {
      const completedName = matches[0];
      setInput(`${command} ${completedName}`);
    }
  };

  const commands = {
    neofetch: () => ({
      type: "neofetch",
      logo: asciiLogoLines,
      info: [
        "OS: Dalil-OS v5.0.1",
        "HOST: ESIEE Paris / Préfecture de Police",
        "KERNEL: React.js / Framer-Motion",
        "UPTIME: 5 years of experience",
        "SHELL: dalil-bash 1.0",
        "PACKAGES: Docker, Kubernetes, Ansible",
        "UI: TailwindCSS",
      ],
    }),
    help: () =>
      "Commands: ls, cd [dir], cat [file], clear, whoami, contact, exit, sudo, neofetch",
    whoami: () =>
      "Dalil Hiane - Ingénieur Informatique @ ESIEE Paris & Préfecture de Police.",
    contact: () => "Email: hianedalil4@gmail.com | GitHub: DaluxOnFlux",
    sudo: () => {
      setIsWaitingForPassword(true);
      return null;
    },
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
    if (e.key === "Tab") {
      e.preventDefault();
      handleTabCompletion();
    }

    if (e.key === "Enter") {
      const promptInfo = `dalil@portfolio:${currentDir}$`;

      if (isWaitingForPassword) {
        setHistory((prev) => [
          ...prev,
          {
            type: "command",
            prompt: "[sudo] password for visitor:",
            content: "********",
          },
          {
            type: "output",
            content: "Nice try! Only me has access here X).",
          },
        ]);
        setIsWaitingForPassword(false);
        setInput("");
        return;
      }

      const parts = input.trim().split(" ");
      const cmd = parts[0].toLowerCase();
      const arg = parts[1];

      let result = commands[cmd]
        ? commands[cmd](arg)
        : cmd !== ""
        ? `command not found: ${cmd}`
        : "";

      const newHistory = [
        ...history,
        { type: "command", prompt: promptInfo, content: input },
      ];

      if (cmd === "sudo") {
        setHistory(newHistory);
      } else if (result && result.type === "neofetch") {
        newHistory.push(result);
        setHistory(newHistory);
      } else if (result !== null) {
        newHistory.push({ type: "output", content: result });
        if (cmd === "clear") setHistory([]);
        else setHistory(newHistory);
      } else {
        if (cmd === "clear") setHistory([]);
        else setHistory(newHistory);
      }

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
                  ) : line.type === "neofetch" ? (
                    <div
                      style={{
                        display: "flex",
                        gap: "30px",
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <pre
                        style={{
                          color: "#6366f1",
                          margin: 0,
                          lineHeight: "1.2",
                          fontFamily: "inherit",
                        }}
                      >
                        {line.logo.join("\n")}
                      </pre>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <span style={{ color: "#6366f1", fontWeight: "bold" }}>
                          dalil@portfolio
                        </span>
                        <span style={{ color: "#ffffff", marginBottom: "5px" }}>
                          -----------------
                        </span>
                        {line.info.map((info, idx) => (
                          <span
                            key={idx}
                            style={{ color: "#a855f7", lineHeight: "1.4" }}
                          >
                            {info}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <span style={{ color: "#a855f7", whiteSpace: "pre-wrap" }}>
                      {line.content}
                    </span>
                  )}
                </div>
              ))}
              <div className="terminal-input-line">
                <span style={{ color: "#6366f1", fontWeight: "bold" }}>
                  {isWaitingForPassword
                    ? "[sudo] password for visitor:"
                    : `dalil@portfolio:${currentDir}$`}
                </span>
                <input
                  ref={inputRef}
                  autoFocus
                  type={isWaitingForPassword ? "password" : "text"}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
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
