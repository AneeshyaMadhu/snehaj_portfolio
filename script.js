const style = document.createElement("style");
style.textContent = `
  @keyframes slamDown {
    0%   { opacity:0; transform:translateY(-80px); filter:blur(8px); }
    55%  { opacity:1; transform:translateY(6px);   filter:blur(0); }
    75%  { transform:translateY(-3px); }
    100% { opacity:1; transform:translateY(0); filter:blur(0); }
  }
  @keyframes dropLine {
    0%   { opacity:0; transform:translateY(-40px); filter:blur(4px); }
    60%  { opacity:1; transform:translateY(3px); filter:blur(0); }
    100% { opacity:1; transform:translateY(0); }
  }
  @keyframes riseChar {
    0%   { opacity:0; transform:translateY(90px); }
    65%  { opacity:1; transform:translateY(-6px); }
    100% { opacity:1; transform:translateY(0); }
  }
  .anim-slam   { animation: slamDown  0.75s cubic-bezier(.22,1,.36,1) both; }
  .anim-drop1  { animation: dropLine  0.65s cubic-bezier(.22,1,.36,1) 0.38s both; }
  .anim-drop2  { animation: dropLine  0.6s  cubic-bezier(.22,1,.36,1) 0.58s both; }
  .anim-rise   { animation: riseChar  1s    cubic-bezier(.22,1,.36,1) 0.18s both; }
`;
document.head.appendChild(style);

const about   = document.querySelector(".about");
const heading = document.querySelector(".content h2");
const para    = document.querySelector(".content p");
const deadpool= document.querySelector(".deadpool");

heading.style.opacity  = "0";
para.style.opacity     = "0";
deadpool.style.opacity = "0";

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    heading.style.opacity  = "";
    para.style.opacity     = "";
    deadpool.style.opacity = "";

    heading.classList.add("anim-slam");
    para.classList.add("anim-drop1");
    deadpool.classList.add("anim-rise");

    const lines = para.querySelectorAll("br");
    if (lines.length) para.classList.replace("anim-drop1", "anim-drop1");

    observer.unobserve(entry.target);
  });
}, { threshold: 0.18 });

observer.observe(about);