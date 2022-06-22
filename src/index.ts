import { v4 as uuidv4 } from 'uuid';
// import {highlightElement, hooks} from 'prismjs'
import * as prism from 'prismjs';

// DOM Variables
const title = document.querySelector('#title') as HTMLInputElement
const languageSelector = document.querySelector('#language') as HTMLSelectElement
const codeInputed = document.querySelector('#code') as HTMLTextAreaElement
const submitBtn = document.querySelector('#submitBtn')?.addEventListener('click', () => {
  if(title.value === '' || languageSelector.value === 'nothing' || codeInputed.value === ''){
    alert('Please fill out the blanks')
  } else {
    parseCode()
  }
})


function parseCode() {
  // creating the title 
  const h3 = document.createElement('h3')
  h3.innerText = title.value
  // crreating the buttons
  const deleteBtn = document.createElement('button')
  deleteBtn.innerText = 'Delete'
  const editBtn = document.createElement('button')
  editBtn.innerText = 'Edit'
  // creating the code part
  const codeCont = document.querySelector('#codeCont') as HTMLDivElement
  const pre = document.createElement("pre");
  const code = document.createElement("code");
  pre.appendChild(code);
  code.className = `snippet language-${languageSelector.value}`;
  code.setAttribute(`data-value`, `${uuidv4()}`)
  code.innerText = codeInputed.value
  prism.hooks.add("before-sanity-check", function (env: any) {
    env.code = env.element.innerText;
  });
  prism.highlightElement(code);
  codeCont.appendChild(h3)
  codeCont.appendChild(pre) 
  codeCont.appendChild(deleteBtn) 
  codeCont.appendChild(editBtn) 

  title.value = ''
  languageSelector.value = 'nothing'
  codeInputed.value = ''
}

export { };