import type { CSSProperties } from "react";

export const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { height: 100%; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse { 0%,100% { opacity:.3 } 50% { opacity:1 } }
  @keyframes breathe { 0%,100% { opacity:.03 } 50% { opacity:.06 } }
  @keyframes shakeSm { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }
  @keyframes streakPop { 0% { transform: scale(1); } 50% { transform: scale(1.15); } 100% { transform: scale(1); } }
  @keyframes streakGlow { 0%,100% { box-shadow: 0 0 8px rgba(200,75,49,0.2); } 50% { box-shadow: 0 0 20px rgba(200,75,49,0.4); } }
  @keyframes streakPulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.9; } }
  @keyframes micPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(200,75,49,0.3); } 50% { box-shadow: 0 0 0 10px rgba(200,75,49,0); } }
  @keyframes slideInLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }
  @keyframes slideOutLeft { from { transform: translateX(0); } to { transform: translateX(-100%); } }
  @keyframes fadeOverlay { from { opacity: 0; } to { opacity: 1; } }
  input:focus { outline: none; border-color: #C84B31 !important; box-shadow: 0 0 0 3px rgba(200,75,49,0.08) !important; }
  button { cursor: pointer; transition: all 0.15s ease; }
  button:active { transform: scale(0.97); }
  main::-webkit-scrollbar { width: 5px; }
  main::-webkit-scrollbar-thumb { background: #D4CBC0; border-radius: 3px; }
  input::placeholder { color: #B0A89E; }
`;

export const C = {
  bg: "#FAF7F2", ink: "#2C2420", inkSoft: "#7A706A", inkMuted: "#B0A89E",
  accent: "#C84B31", white: "#FFFFFF", border: "#E8E0D6",
  success: "#4A7C59", successBg: "#E8F5E9",
  warn: "#D4A843", warnBg: "#FFF8E1",
  errorBg: "#FFF0ED",
} as const;

export const font = "'Noto Sans JP', 'Outfit', sans-serif";

export const weakDot = (on: boolean): CSSProperties => ({
  width: 8, height: 8, borderRadius: "50%",
  backgroundColor: on ? C.accent : C.border, transition: "all 0.2s",
});

type Styles = Record<string, CSSProperties>;

export const S: Styles = {
  root: { position: "relative", display: "flex", flexDirection: "column", height: "100vh", width: "100%", backgroundColor: C.bg, fontFamily: font, color: C.ink, overflow: "hidden" },
  appShell: { position: "relative", display: "flex", flexDirection: "row", height: "100vh", width: "100%", backgroundColor: C.bg, fontFamily: font, color: C.ink, overflow: "hidden" },

  sidebar: { width: 220, display: "flex", flexDirection: "column", borderRight: `1px solid ${C.border}`, backgroundColor: "rgba(250,247,242,0.97)", backdropFilter: "blur(12px)", flexShrink: 0, position: "relative", zIndex: 10 },
  sidebarLogoArea: { padding: "18px 16px 14px", borderBottom: `1px solid ${C.border}` },
  sidebarNav: { display: "flex", flexDirection: "column", gap: 2, padding: "10px", flex: 1, overflowY: "auto" },
  sidebarNavBtn: { display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 12px", borderRadius: 10, border: "none", background: "transparent", fontSize: 14, fontFamily: font, color: C.ink, fontWeight: 500, textAlign: "left", cursor: "pointer" },
  sidebarNavBtnActive: { backgroundColor: "rgba(200,75,49,0.08)", color: C.accent, fontWeight: 600 },
  sidebarStats: { padding: "14px 16px", borderTop: `1px solid ${C.border}`, display: "flex", gap: 14, justifyContent: "center", alignItems: "center" },

  contentCol: { display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" },
  mobileHeader: { position: "relative", zIndex: 10, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.border}`, backgroundColor: "rgba(250,247,242,0.95)", backdropFilter: "blur(12px)", gap: 8 },
  hamburgerBtn: { display: "flex", flexDirection: "column", gap: 5, border: "none", background: "transparent", padding: 6, cursor: "pointer", flexShrink: 0 },
  hamburgerLine: { width: 22, height: 2, backgroundColor: C.ink, borderRadius: 1, display: "block" },

  menuOverlay: { position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.35)", zIndex: 100, animation: "fadeOverlay 0.18s ease" },
  menuDrawer: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: C.bg, zIndex: 101, display: "flex", flexDirection: "column", animation: "slideInLeft 0.22s ease" },
  menuDrawerHeader: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "18px 16px 14px", borderBottom: `1px solid ${C.border}` },
  menuDrawerNav: { display: "flex", flexDirection: "column", gap: 2, padding: "10px", flex: 1, overflowY: "auto" },
  menuDrawerNavBtn: { display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "12px 14px", borderRadius: 10, border: "none", background: "transparent", fontSize: 15, fontFamily: font, color: C.ink, fontWeight: 500, textAlign: "left", cursor: "pointer" },
  menuCloseBtn: { width: 32, height: 32, borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: C.inkSoft, cursor: "pointer", flexShrink: 0 },
  bgGrain: { position: "absolute", inset: 0, opacity: 0.04, backgroundImage: `radial-gradient(circle at 15% 50%, ${C.accent} 0%, transparent 50%), radial-gradient(circle at 85% 20%, ${C.warn} 0%, transparent 40%)`, pointerEvents: "none", animation: "breathe 10s ease-in-out infinite" },
  loadingWrap: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: C.bg, gap: 12 },
  loadingChar: { fontSize: 48, animation: "pulse 1.5s ease-in-out infinite" },
  loadingText: { fontSize: 13, color: C.inkSoft },

  header: { position: "relative", zIndex: 10, padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.border}`, backgroundColor: "rgba(250,247,242,0.95)", backdropFilter: "blur(12px)" },
  headerLeft: { display: "flex", alignItems: "baseline", gap: 8 },
  logo: { fontSize: 20, fontWeight: 700 },
  logoSub: { fontSize: 11, color: C.inkMuted, fontFamily: "'DM Serif Display', serif", fontStyle: "italic" },
  headerRight: { display: "flex", gap: 14 },
  stat: { display: "flex", flexDirection: "column", alignItems: "center" },
  statN: { fontSize: 15, fontWeight: 600, lineHeight: 1 },
  statL: { fontSize: 9, color: C.inkMuted, textTransform: "uppercase", letterSpacing: "0.08em" },

  viewToggle: { display: "flex", borderBottom: `1px solid ${C.border}`, backgroundColor: "rgba(250,247,242,0.9)", position: "relative", zIndex: 10 },
  viewBtn: { flex: 1, padding: "10px 4px 8px", border: "none", background: "transparent", fontSize: 14, fontWeight: 500, fontFamily: font, color: C.inkSoft, borderBottom: "2px solid transparent" },
  viewBtnActive: { color: C.accent, borderBottomColor: C.accent, fontWeight: 600, backgroundColor: "rgba(200,75,49,0.04)" },

  main: { flex: 1, overflowY: "auto", position: "relative", zIndex: 1 },

  quizWrap: { maxWidth: 440, margin: "0 auto", padding: "16px", animation: "fadeIn 0.25s ease" },
  toggleRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 12 },
  weakToggle: { display: "flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 20, border: `1.5px solid ${C.border}`, backgroundColor: C.white, fontSize: 13, fontFamily: font, color: C.inkSoft, fontWeight: 500 },
  weakToggleOn: { borderColor: C.accent, backgroundColor: "rgba(200,75,49,0.06)", color: C.accent },
  weakEmpty: { fontSize: 11, color: C.inkMuted, fontStyle: "italic" },

  streakArea: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6, marginBottom: 14, minHeight: 20 },
  streakDisplay: { display: "flex", alignItems: "center", gap: 6, padding: "6px 16px", borderRadius: 24, transition: "all 0.3s ease" },
  streakWarm: { backgroundColor: "#FFF8E1", border: "1.5px solid #FFE082" },
  streakHot: { backgroundColor: "#FFF3E0", border: "1.5px solid #FFB74D" },
  streakFire: { backgroundColor: "#FBE9E7", border: "1.5px solid #FF8A65", animation: "streakGlow 2s ease-in-out infinite" },
  streakLegendary: { backgroundColor: "#FCE4EC", border: "1.5px solid #EF5350", animation: "streakGlow 1s ease-in-out infinite, streakPulse 2s ease-in-out infinite" },
  streakPop: { animation: "streakPop 0.35s ease" },
  streakEmoji: { fontSize: 16, lineHeight: 1 },
  streakNumber: { fontSize: 22, fontWeight: 700, lineHeight: 1, color: "#2C2420" },
  streakLabel: { fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C84B31" },
  sessionRow: { display: "flex", alignItems: "center", gap: 14 },
  sessionText: { fontSize: 13, fontWeight: 600, color: "#7A706A" },
  bestStreak: { fontSize: 11, color: "#B0A89E", fontWeight: 500 },

  card: { backgroundColor: C.white, borderRadius: 20, border: `1.5px solid ${C.border}`, padding: "32px 24px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, transition: "border-color 0.3s, box-shadow 0.3s" },
  cardWrong: { borderColor: "#E8A090", boxShadow: "0 0 0 4px rgba(200,75,49,0.08)", animation: "shakeSm 0.3s ease" },
  cardCorrect: { borderColor: "#A8D5B6", boxShadow: "0 0 0 4px rgba(74,124,89,0.08)" },
  charBig: { fontSize: 88, fontWeight: 500, lineHeight: 1, userSelect: "none" },
  correctBanner: { display: "flex", alignItems: "center", gap: 8 },
  correctText: { fontSize: 22, fontWeight: 600, color: C.success },
  newBest: { fontSize: 10, fontWeight: 700, color: C.accent, backgroundColor: "rgba(200,75,49,0.08)", padding: "2px 8px", borderRadius: 6, letterSpacing: "0.08em", animation: "streakPop 0.4s ease" },
  wrongSection: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6, width: "100%" },
  wrongBanner: { display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: C.accent },
  wrongAnswer: { fontSize: 36, fontWeight: 700, color: C.accent, letterSpacing: "0.05em" },
  wrongInstruction: { fontSize: 12, color: C.inkMuted, fontStyle: "italic" },
  inputRow: { display: "flex", gap: 8, width: "100%", maxWidth: 280 },
  input: { flex: 1, padding: "12px 16px", borderRadius: 12, border: `1.5px solid ${C.border}`, fontSize: 16, fontFamily: font, color: C.ink, backgroundColor: C.bg, textAlign: "center", letterSpacing: "0.05em" },
  inputDone: { opacity: 0.5, backgroundColor: C.successBg },
  inputForce: { borderColor: "#E8A090", backgroundColor: C.errorBg },
  submitBtn: { padding: "10px 18px", borderRadius: 12, border: "none", backgroundColor: C.ink, color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: font, flexShrink: 0 },
  enterHint: { fontSize: 11, color: C.inkMuted, fontStyle: "italic" },
  retryInfo: { textAlign: "center", fontSize: 12, color: C.warn, marginTop: 14, fontWeight: 500 },
  actionsRow: { display: "flex", gap: 8, justifyContent: "center", marginTop: 20 },
  actionBtn: { padding: "8px 16px", borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: "transparent", fontSize: 12, fontFamily: font, color: C.inkSoft },
  actionBtnDanger: { padding: "8px 16px", borderRadius: 8, border: "1px solid #E8C4B8", backgroundColor: "transparent", fontSize: 12, fontFamily: font, color: C.accent },

  chartWrap: { padding: "16px", maxWidth: 500, margin: "0 auto", animation: "fadeIn 0.25s ease" },
  groupTitle: { fontSize: 12, fontWeight: 600, color: C.inkSoft, textTransform: "uppercase", letterSpacing: "0.08em", padding: "4px 0 6px 28px", borderBottom: `1px solid ${C.border}`, marginBottom: 6 },
  grid: { display: "flex", flexDirection: "column", gap: 3 },
  gridHeaderRow: { display: "flex", gap: 3 },
  gridRow: { display: "flex", gap: 3 },
  colHead: { flex: 1, textAlign: "center", fontSize: 11, fontWeight: 600, color: C.inkMuted, padding: "2px 0", textTransform: "uppercase" },
  rowLabel: { width: 24, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 600, color: C.inkMuted },
  cell: { flex: 1, aspectRatio: "1", borderRadius: 8, border: `1px solid ${C.border}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1, padding: 2, backgroundColor: C.white, transition: "all 0.15s" },
  cellSelected: { borderColor: C.accent, boxShadow: "0 0 0 2px rgba(200,75,49,0.2)" },
  cellH: { fontSize: 18, fontWeight: 500, lineHeight: 1 },
  cellR: { fontSize: 8, color: C.inkMuted },
  charDetail: { marginTop: 14, padding: "14px", backgroundColor: C.white, borderRadius: 12, border: `1px solid ${C.border}`, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 },
  detailH: { fontSize: 44, fontWeight: 600 },
  detailR: { fontSize: 18, color: C.inkSoft },
  detailStat: { fontSize: 12, color: C.inkMuted },
  legend: { display: "flex", justifyContent: "center", gap: 12, marginTop: 14, fontSize: 10, color: C.inkMuted, flexWrap: "wrap" },
  dot: { display: "inline-block", width: 10, height: 10, borderRadius: "50%", marginRight: 4, verticalAlign: "middle" },

  fillWrap: { maxWidth: 480, margin: "0 auto", padding: "20px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 14, animation: "fadeIn 0.25s ease" },
  fillHero: { display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 10, marginTop: 20 },
  fillTitle: { fontSize: 22, fontWeight: 600 },
  fillDesc: { fontSize: 14, color: C.inkSoft, lineHeight: 1.6 },
  fillStartBtn: { padding: "12px 28px", borderRadius: 12, border: "none", backgroundColor: C.accent, color: "#fff", fontSize: 15, fontWeight: 600, fontFamily: font, marginTop: 8 },
  fillScoreBig: { fontSize: 48, fontWeight: 700, fontFamily: "'DM Serif Display', serif", color: C.accent },
  fillProgress: { height: 4, borderRadius: 2, backgroundColor: "#E8E0D6", overflow: "hidden", width: "100%" },
  fillProgressFill: { height: "100%", backgroundColor: C.accent, borderRadius: 2, transition: "width 0.4s ease" },
  fillCounter: { fontSize: 12, color: C.inkMuted },
  romajiToggle: { display: "flex", alignItems: "center", gap: 4, padding: "4px 12px", borderRadius: 14, border: `1.5px solid ${C.border}`, backgroundColor: C.white, fontSize: 11, fontFamily: font, color: C.inkMuted, fontWeight: 500 },
  romajiToggleOn: { borderColor: "#7C9AB5", backgroundColor: "rgba(124,154,181,0.08)", color: "#5A7A96" },
  romajiLine: { fontSize: 13, color: "#7C9AB5", fontFamily: "'Outfit', sans-serif", letterSpacing: "0.03em", textAlign: "center", lineHeight: 1.6 },
  fillCard: { backgroundColor: C.white, borderRadius: 20, border: `1.5px solid ${C.border}`, padding: "28px 20px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, transition: "all 0.3s" },
  fillCardCorrect: { borderColor: "#A8D5B6", boxShadow: "0 0 0 4px rgba(74,124,89,0.08)" },
  fillCardWrong: { borderColor: "#E8A090", boxShadow: "0 0 0 4px rgba(200,75,49,0.08)", animation: "shakeSm 0.3s ease" },
  fillSentence: { fontSize: 22, fontWeight: 500, lineHeight: 1.8, textAlign: "center", wordBreak: "break-word" },
  fillBlank: { display: "inline-block", padding: "2px 12px", margin: "0 4px", borderRadius: 8, backgroundColor: "#F0EBE3", border: "2px dashed #D4CBC0", fontSize: 22, fontWeight: 600, minWidth: 60, textAlign: "center", transition: "all 0.3s" },
  fillBlankCorrect: { backgroundColor: "#E8F5E9", borderColor: "#4A7C59", borderStyle: "solid", color: "#4A7C59" },
  fillBlankWrong: { backgroundColor: "#FFF0ED", borderColor: "#C84B31", borderStyle: "solid", color: "#C84B31" },
  fillTranslation: { fontSize: 13, color: C.inkMuted, fontStyle: "italic", textAlign: "center" },
  fillWrongInfo: { display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: C.accent },
  fillCorrectInfo: { display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: C.success },
  fillHint: { fontSize: 12, color: C.inkMuted },
  fillRetryHint: { fontSize: 12, color: C.warn, fontWeight: 500 },
  fillOptions: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, width: "100%" },
  fillOption: { display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderRadius: 14, border: `1.5px solid ${C.border}`, backgroundColor: C.white, fontSize: 18, fontFamily: font, color: C.ink, textAlign: "left", transition: "all 0.15s" },
  fillOptionCorrect: { borderColor: "#4A7C59", backgroundColor: "#E8F5E9" },
  fillOptionWrong: { borderColor: "#C84B31", backgroundColor: "#FFF0ED" },
  fillOptionNum: { fontSize: 11, fontWeight: 600, color: C.inkMuted, backgroundColor: "#F0EBE3", width: 22, height: 22, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  fillOptionText: { fontWeight: 500 },
  fillOptionTextWrap: { display: "flex", flexDirection: "column", gap: 1 },
  fillOptionRomaji: { fontSize: 11, color: "#7C9AB5", fontFamily: "'Outfit', sans-serif", fontWeight: 400 },
  fillNextBtn: { padding: "10px 24px", borderRadius: 12, border: "none", backgroundColor: C.accent, color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: font },
  fillEnterHint: { fontSize: 11, color: C.inkMuted, fontStyle: "italic" },

  readWrap: { maxWidth: 520, margin: "0 auto", padding: "20px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 14, animation: "fadeIn 0.25s ease" },
  readTopics: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, width: "100%" },
  readTopicBtn: { padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${C.border}`, backgroundColor: C.white, fontSize: 14, fontFamily: font, color: C.ink, fontWeight: 500, textAlign: "left" },
  readTitle: { fontSize: 18, fontWeight: 600 },
  readCard: { backgroundColor: C.white, borderRadius: 20, border: `1.5px solid ${C.border}`, padding: "24px 20px", width: "100%", display: "flex", flexDirection: "column", gap: 14 },
  readLine: { display: "flex", flexDirection: "column", gap: 2 },
  readLineJp: { fontSize: 20, fontWeight: 400, lineHeight: 1.8, letterSpacing: "0.04em" },
  readLineRomaji: { fontSize: 12, color: "#7C9AB5", fontFamily: "'Outfit', sans-serif", lineHeight: 1.4 },
  readTransBtn: { padding: "8px 18px", borderRadius: 10, border: `1.5px dashed ${C.border}`, backgroundColor: "transparent", fontSize: 12, fontFamily: font, color: C.inkSoft, fontWeight: 500, alignSelf: "center" },
  readTransCard: { backgroundColor: "rgba(124,154,181,0.06)", borderRadius: 12, padding: "14px 18px", width: "100%", display: "flex", flexDirection: "column", gap: 4 },
  readTransLine: { fontSize: 13, color: "#5A7A96", lineHeight: 1.6 },
  readQuizSection: { width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 },
  readQuizQ: { fontSize: 14, fontWeight: 600, textAlign: "center" },
  readQuizOptions: { display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" },
  readQuizOpt: { display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 12, border: `1.5px solid ${C.border}`, backgroundColor: C.white, fontSize: 16, fontFamily: font, fontWeight: 500 },
  readBottomRow: { display: "flex", gap: 8, alignItems: "center" },

  verbFormRow: { display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", width: "100%", marginBottom: 4 },
  verbFormBtn: { padding: "6px 14px", borderRadius: 10, border: `1.5px solid ${C.border}`, backgroundColor: C.white, fontSize: 12, fontFamily: font, color: C.inkSoft, fontWeight: 500 },
  verbFormBtnOn: { borderColor: C.accent, backgroundColor: "rgba(200,75,49,0.06)", color: C.accent, fontWeight: 600 },
  verbTypeTag: { fontSize: 10, fontWeight: 600, color: C.inkMuted, backgroundColor: "#F0EBE3", padding: "3px 10px", borderRadius: 6, letterSpacing: "0.06em", textTransform: "uppercase" },
  verbPrompt: { fontSize: 22, fontWeight: 600, textAlign: "center", color: C.ink, lineHeight: 1.4 },
  verbPromptJP: { fontSize: 32, fontWeight: 500, textAlign: "center", color: C.ink, lineHeight: 1.3, letterSpacing: "0.04em" },
  verbFeedback: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "center" },
  verbFeedbackText: { fontSize: 14, color: C.success, fontWeight: 500 },
  verbFeedbackWrong: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6, width: "100%" },
  verbFeedbackCorrectLine: { display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: C.success, flexWrap: "wrap", justifyContent: "center" },

  adjTypeBtn: { padding: "5px 12px", borderRadius: 8, border: `1.5px solid ${C.border}`, backgroundColor: C.white, fontSize: 12, fontFamily: font, fontWeight: 500, color: C.inkSoft },
  adjTypeBtnIOn: { borderColor: "#6B8E7B", backgroundColor: "rgba(74,124,89,0.06)", color: "#4A7C59", fontWeight: 600 },
  adjTypeBtnNaOn: { borderColor: "#7C9AB5", backgroundColor: "rgba(124,154,181,0.06)", color: "#5A7A96", fontWeight: 600 },
  adjTransformHint: { fontSize: 13, fontWeight: 600, color: C.accent, marginTop: 4 },
  adjOptionsSmall: { display: "flex", gap: 10, justifyContent: "center", width: "100%" },
  adjRefCard: { width: "100%", padding: "12px 16px", borderRadius: 12, backgroundColor: "#F9F6F2", border: `1px solid ${C.border}`, marginTop: 8 },
  adjRefTitle: { fontSize: 10, fontWeight: 600, color: C.inkMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 },
  adjRefRow: { fontSize: 12, color: C.inkSoft, lineHeight: 1.8 },
  adjRefLabel: { display: "inline-block", width: 52, fontWeight: 600, color: C.inkMuted },

  numRefGrid: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6, width: "100%" },
  numRefItem: { display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "8px 4px", borderRadius: 10, backgroundColor: "#F9F6F2", border: `1px solid ${C.border}` },
  numRefDigit: { fontSize: 18, fontWeight: 700, fontFamily: "'DM Serif Display', serif", color: C.accent },
  numRefH: { fontSize: 14, fontWeight: 500 },
  numRefR: { fontSize: 9, color: "#7C9AB5", fontFamily: "'Outfit', sans-serif" },
  numRefAlt: { fontSize: 9, color: C.inkMuted, fontStyle: "italic" },

  playRow: { display: "flex", alignItems: "center", gap: 8 },

  speakWrap: { maxWidth: 440, margin: "0 auto", padding: "16px", display: "flex", flexDirection: "column", gap: 14, animation: "fadeIn 0.25s ease" },
  speakHeader: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4, marginBottom: 4 },
  speakTitle: { fontSize: 20, fontWeight: 600 },
  speakSub: { fontSize: 13, color: C.inkMuted, textAlign: "center" },
  speakMicRow: { display: "flex", flexDirection: "column", alignItems: "center", gap: 8 },
  speakListening: { fontSize: 13, color: C.accent, fontWeight: 600, letterSpacing: "0.04em" },
  speakMicHint: { fontSize: 11, color: C.inkMuted, fontStyle: "italic" },
  speakNoMic: { fontSize: 12, color: C.inkMuted, textAlign: "center", fontStyle: "italic", maxWidth: 260 },
  speakOrRow: { display: "flex", alignItems: "center", gap: 10, width: "100%" },
  speakOrLine: { flex: 1, height: 1, backgroundColor: C.border },
  speakOrText: { fontSize: 11, color: C.inkMuted, whiteSpace: "nowrap", textTransform: "uppercase", letterSpacing: "0.08em" },

  speakFeedback: { minHeight: 20, display: "flex", alignItems: "center", justifyContent: "center" },
  speakInterim: { fontSize: 13, color: C.inkMuted, fontStyle: "italic" },
  speakHeard: { fontSize: 12, color: C.warn, fontWeight: 500 },

  speakCatGrid: { display: "grid", gridTemplateColumns: "1fr", gap: 10, width: "100%" },
  speakCatBtn: { display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 3, padding: "18px 20px", borderRadius: 16, border: `1.5px solid ${C.border}`, backgroundColor: C.white, fontFamily: font, cursor: "pointer", textAlign: "left", transition: "all 0.15s" },
  speakCatEmoji: { fontSize: 28, lineHeight: 1, marginBottom: 2 },
  speakCatLabel: { fontSize: 17, fontWeight: 600, color: C.ink },
  speakCatDesc: { fontSize: 13, color: C.inkSoft },
  speakCatCount: { fontSize: 11, color: C.inkMuted, marginTop: 2 },

  speakDrillHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", gap: 8 },
  speakProgress: { fontSize: 13, color: C.inkMuted, fontWeight: 500 },

  speakItemHint: { fontSize: 13, color: C.inkMuted, fontWeight: 500, letterSpacing: "0.02em" },
  speakHintBtn: { fontSize: 11, color: C.inkMuted, background: "none", border: `1px dashed ${C.border}`, borderRadius: 8, padding: "3px 12px", fontFamily: font, cursor: "pointer" },
  speakItemText: { fontSize: 52, fontWeight: 500, lineHeight: 1.2, textAlign: "center", letterSpacing: "0.04em" },

  // ── Anime tab ──────────────────────────────────────────────────────────────
  animeWrap: { maxWidth: 480, margin: "0 auto", padding: "20px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 14, animation: "fadeIn 0.25s ease" },

  // Picker
  animeCatGrid: { display: "grid", gridTemplateColumns: "1fr", gap: 10, width: "100%" },
  animeCatBtn: { display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 3, padding: "18px 20px", borderRadius: 16, border: `1.5px solid #E8E0D6`, backgroundColor: "#FFFFFF", fontFamily: "'Noto Sans JP', 'Outfit', sans-serif", cursor: "pointer", textAlign: "left", transition: "all 0.15s", width: "100%" },
  animeCatEmoji: { fontSize: 28, lineHeight: 1, marginBottom: 2 },
  animeCatLabel: { fontSize: 17, fontWeight: 600, color: "#2C2420" },
  animeCatLabelJP: { fontSize: 13, color: "#B0A89E", fontFamily: "'Noto Sans JP', sans-serif" },
  animeCatDesc: { fontSize: 13, color: "#7A706A", marginTop: 2 },

  // Context badge (shown after correct vocab answer)
  animeContextBadge: { fontSize: 11, fontWeight: 500, color: "#7C9AB5", backgroundColor: "rgba(124,154,181,0.10)", padding: "4px 12px", borderRadius: 8, textAlign: "center" as const },

  // Dialogue / manga panel
  animeDialogueCard: { backgroundColor: "#FFFFFF", borderRadius: 20, border: `1.5px solid #E8E0D6`, padding: "20px 18px", width: "100%", display: "flex", flexDirection: "column", gap: 14 },
  animeSpeakerRow: { display: "flex", alignItems: "flex-start", gap: 10 },
  animeSpeakerPillA: { fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 10, flexShrink: 0, marginTop: 4, backgroundColor: "rgba(200,75,49,0.10)", color: "#C84B31", whiteSpace: "nowrap" as const },
  animeSpeakerPillB: { fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 10, flexShrink: 0, marginTop: 4, backgroundColor: "rgba(124,154,181,0.12)", color: "#5A7A96", whiteSpace: "nowrap" as const },
  animeLineText: { fontSize: 19, fontWeight: 400, lineHeight: 1.8, letterSpacing: "0.04em", flex: 1 },
  animeSourceTag: { fontSize: 11, color: "#B0A89E", fontStyle: "italic" as const, textAlign: "center" as const, width: "100%" },
  animeTitleJP: { fontSize: 18, fontWeight: 600 },
  animeTitleEN: { fontSize: 12, color: "#B0A89E" },

  // Topic picker grid
  animeTopicGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, width: "100%" },
  animeTopicBtn: { padding: "12px 14px", borderRadius: 12, border: `1.5px solid #E8E0D6`, backgroundColor: "#FFFFFF", fontFamily: "'Noto Sans JP', 'Outfit', sans-serif", color: "#2C2420", fontWeight: 500, textAlign: "left" as const, display: "flex", flexDirection: "column", gap: 2 },

  // Quote fill
  animeQuoteCard: { backgroundColor: "#FFFFFF", borderRadius: 20, border: `1.5px solid #E8E0D6`, padding: "28px 20px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 14, transition: "all 0.3s" },
  animeQuoteSource: { fontSize: 11, fontWeight: 600, color: "#7C9AB5", backgroundColor: "rgba(124,154,181,0.10)", padding: "3px 12px", borderRadius: 6, letterSpacing: "0.06em" },
  animeQuoteSentence: { fontSize: 22, fontWeight: 500, lineHeight: 1.8, textAlign: "center" as const, wordBreak: "break-word" as const },
  animeQuoteEn: { fontSize: 13, color: "#B0A89E", fontStyle: "italic" as const, textAlign: "center" as const, lineHeight: 1.6 },
};
