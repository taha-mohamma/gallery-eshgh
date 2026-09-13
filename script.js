const cards=[...document.querySelectorAll(".card")];
const filters=[...document.querySelectorAll(".filter")];
const search=document.getElementById("search");
const empty=document.getElementById("empty");
const viewer=document.getElementById("viewer");
const viewerImage=document.getElementById("viewerImage");
let visible=[];
let index=0;

function update(){
  const category=document.querySelector(".filter.active").dataset.filter;
  const q=search.value.trim().toLowerCase();
  visible=cards.filter(c=>{
    const okCat=category==="all"||c.dataset.category===category;
    const okSearch=c.dataset.title.toLowerCase().includes(q);
    c.style.display=okCat&&okSearch?"block":"none";
    return okCat&&okSearch;
  });
  empty.style.display=visible.length?"none":"block";
}
filters.forEach(btn=>btn.addEventListener("click",()=>{
  filters.forEach(b=>b.classList.remove("active"));
  btn.classList.add("active"); update();
}));
search.addEventListener("input",update);

function openViewer(card){
  index=visible.indexOf(card);
  viewerImage.src=card.querySelector("img").src;
  viewerImage.alt=card.querySelector("img").alt;
  viewer.classList.add("show");
  viewer.setAttribute("aria-hidden","false");
}
cards.forEach(c=>c.addEventListener("click",()=>openViewer(c)));

function move(step){
  if(!visible.length)return;
  index=(index+step+visible.length)%visible.length;
  const img=visible[index].querySelector("img");
  viewerImage.src=img.src; viewerImage.alt=img.alt;
}
document.getElementById("prev").onclick=()=>move(-1);
document.getElementById("next").onclick=()=>move(1);
document.getElementById("closeViewer").onclick=closeViewer;
viewer.addEventListener("click",e=>{if(e.target===viewer)closeViewer()});
document.addEventListener("keydown",e=>{
  if(!viewer.classList.contains("show"))return;
  if(e.key==="Escape")closeViewer();
  if(e.key==="ArrowLeft")move(-1);
  if(e.key==="ArrowRight")move(1);
});
function closeViewer(){viewer.classList.remove("show");viewer.setAttribute("aria-hidden","true");}
update();
