const notes_txt=document.getElementById('notes')
const save_btn=document.getElementById('save_btn')
const new_notes=document.getElementById('new_note')
const items=document.getElementById('notes_item')
const msg=document.getElementById('msg')
let txt_names=[]
let txt_name=''
let lt=[]
let count=0
let copy=[]
let c=0
// localStorage.clear()
let local_work=JSON.parse(localStorage.getItem('copy'))
console.log(local_work)
if(local_work){
    copy=local_work
    txt_names=copy.slice(0)
    saved_work()
}
notes_txt.addEventListener('click',function(){
    notes_txt.textContent=" ".trim()
})
new_notes.addEventListener('click',function(){
    notes_txt.value=""
    count=0
})
save_btn.addEventListener('click',function(){
    if(count&&notes_txt.value!=null){
        localStorage.setItem(txt_names[count-1],notes_txt.value)
        localStorage.setItem('copy',JSON.stringify(copy))
        count=0
    }
    else{
    txt_name=prompt('Enter The Name of The  Notes:')
    let txtName=''
    if(txt_name!==''&& txt_name!=null){
        for(let m=0;m<txt_names.length;m++){if(txt_names[m]===txt_name){
            c=c+1
        }}
        if(txt_names.includes(txt_name)===true){
            txtName=txt_name+c
        }
        else{
            txtName=txt_name
        }
    txt_names.push(txtName)
    copy.push(txtName)
    let i=txt_names.length
     items.innerHTML+= `<li>
 <a href="#" >
NOTES_${txtName}
 </a>
 <button id="edit" onclick=edit_func(${i})>EDIT
 </button>
  <button id="delete" onclick=del(txt_names[${i-1}])>
  DELETE
 </button>
 </li>` 
 localStorage.setItem(txt_names[i-1],notes_txt.value)
 localStorage.setItem('copy',JSON.stringify(copy))
 msg.innerHTML="Notes Saved Successfully"
 setTimeout(function(){
    msg.innerHTML=""
},3000)
    }
    }

})
function edit_func(i){
    notes_txt.value=localStorage.getItem(txt_names[i-1])
    count=i
 
}

function del(namess){
   lt.push(namess)
   items.innerHTML=''
   console.log(namess)
console.log(txt_names.indexOf(namess))
   for(let j=1;j<txt_names.length+1;j++){
       if(lt.includes(txt_names[j-1])===false && txt_names.indexOf(namess)!==j-1){
  items.innerHTML+= `<li>
 <a href="#" >
NOTES_${txt_names[j-1]}
 </a>
 <button id="edit" onclick=edit_func(${j})>EDIT
 </button>
  <button id="delete" onclick=del(txt_names[${j-1}])>
  DELETE
 </button>
 </li>`
    
}
} 

copy.splice(copy.indexOf(namess),1)
localStorage.removeItem(namess)
localStorage.setItem('copy',JSON.stringify(copy))
msg.innerHTML="Notes Deleted Successfully"
setTimeout(function(){
    msg.innerHTML=""
},3000)

}

function saved_work(){
    items.innerHTML=''
    for(let h=1;h<copy.length+1;h++){
  items.innerHTML+= `<li>
 <a href="#" >
NOTES_${txt_names[h-1]}
 </a>
 <button id="edit" onclick=edit_func(${h})>EDIT
 </button>
  <button id="delete" onclick=del(txt_names[${h-1}])>
  DELETE
 </button>
 </li>`
    
}
}