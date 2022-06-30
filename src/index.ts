import { v4 as uuidv4 } from 'uuid';
// import {highlightElement, hooks} from 'prismjs'
import * as prism from 'prismjs';

const dataArr: { id: string; title: string, lang: string, codeBlock: string }[] = [];


// DOM Variables
const title = document.querySelector('#title') as HTMLInputElement
const languageSelector = document.querySelector('#language') as HTMLSelectElement
const codeInputed = document.querySelector('#code') as HTMLTextAreaElement
const submitBtn = document.querySelector('#submitBtn') as HTMLButtonElement
submitBtn.addEventListener('click', () => {
  if (title.value === '' || languageSelector.value === 'nothing' || codeInputed.value === '') {
    alert('Please fill out the blanks')
  } else {
    parseCode(title.value, uuidv4(), codeInputed.value, languageSelector.value)
  }
})



function parseCode(tit: string, id: string, codeBlock: string, land: string) {
  //  creating a div
  const div = document.createElement('div')
  div.setAttribute(`data-id`, `${id}`)
  // creating the title
  const h3 = document.createElement('h3')
  h3.innerText = tit
  // crreating the buttons
  let deleteBtn = document.createElement('button') as HTMLButtonElement
  deleteBtn.innerText = 'Delete'
  deleteBtn.onclick = deleteCodeBlock;
  let editBtn = document.createElement('button') as HTMLButtonElement
  editBtn.innerText = 'Edit'
  editBtn.onclick = (e: Event) => {
    submitBtn.style.display = 'none'
    const btnCont = document.querySelector('#btns-cont')
    const saveBtn = document.createElement('button')
    saveBtn.innerText = 'Save'
    saveBtn.style.display = 'inline-block'
    btnCont?.appendChild(saveBtn)
    title.value = h3.innerText;
    codeInputed.value = code.innerText;
    (<HTMLElement>e.target).parentElement?.remove()
    saveBtn.addEventListener('click', () => {
      parseCode(title.value, uuidv4(), codeInputed.value, languageSelector.value)
      saveBtn.style.display = 'none'
      submitBtn.style.display = 'inline-block'
    })
  }
  // creating the code part
  const codeCont = document.querySelector('#codeCont') as HTMLDivElement
  const pre = document.createElement("pre");
  const code = document.createElement("code");
  pre.appendChild(code);
  code.className = `snippet language-${languageSelector.value}`;
  code.innerText = codeBlock
  prism.hooks.add("before-sanity-check", function (env: any) {
    env.code = env.element.innerText;
  });
  prism.highlightElement(code);
  div.appendChild(h3)
  div.appendChild(pre)
  div.appendChild(deleteBtn)
  div.appendChild(editBtn)
  //
  codeCont.appendChild(div)
  title.value = ''
  languageSelector.value = 'nothing'
  codeInputed.value = ''
}

const deleteCodeBlock = (e: Event) => {
  (<HTMLElement>e.target).parentElement?.remove()
}


export { };

