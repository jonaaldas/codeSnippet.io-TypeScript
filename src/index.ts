import { stringify, v4 as uuidv4 } from "uuid";
import * as prism from "prismjs";
// DOM Variables

const title = document.querySelector("#title") as HTMLInputElement;
const languageSelector = document.querySelector(
	"#language"
) as HTMLSelectElement;
const codeInputed = document.querySelector("#code") as HTMLTextAreaElement;
const submitBtn = document.querySelector("#submitBtn") as HTMLButtonElement;
submitBtn?.addEventListener("click", () => {
	if (
		title.value === "" ||
		languageSelector.value === "nothing" ||
		codeInputed.value === ""
	) {
		alert("Please fill out the blanks");
	} else {
		parseCode(title.value, uuidv4(), codeInputed.value, languageSelector.value);
		location.reload();
	}
});

const codeCont = document.querySelector("#codeCont") as HTMLDivElement;

function parseCode(tit: string, id: string, codeBlock: string, land: string) {
	// save into an array
	const objData: { title: string; lang: string; codeBlock: string } = {
		title: tit,
		lang: land,
		codeBlock: codeBlock,
	};
	localStorage.setItem(id, JSON.stringify(objData));
	title.value = "";
	languageSelector.value = "nothing";
	codeInputed.value = "";
}

const deleteCodeBlock = (e: Event) => {
	(<HTMLElement>e.target).parentElement?.remove();
	const id: any = (<HTMLElement>e.target).parentElement?.dataset.id;
	localStorage.removeItem(id);
};

const checkLocalStorageAndRun = () => {
	for (let i = 0; i < localStorage.length; i++) {
		const key: any = localStorage.key(i);
		const value: any = localStorage.getItem(key);
		const obj = JSON.parse(value);
		const div = document.createElement("div");
		div.setAttribute(`data-id`, `${key}`);
		div.className = "eachCont";
		// creating the title
		const h3 = document.createElement("h3");
		h3.innerText = obj.title;
		// crreating the buttons
		let deleteBtn = document.createElement("button") as HTMLButtonElement;
		deleteBtn.innerText = "Delete";
		deleteBtn.id = "delete-btn ";
		deleteBtn.className = "button-38";
		deleteBtn.onclick = deleteCodeBlock;
		let editBtn = document.createElement("button") as HTMLButtonElement;
		editBtn.innerText = "Edit";
		editBtn.id = "edit-btn ";
		editBtn.className = "button-38";
		editBtn.onclick = (e: Event) => {
			const id: any = (<HTMLElement>e.target).parentElement?.dataset.id;
			localStorage.removeItem(id);

			submitBtn.style.display = "none";
			const btnCont = document.querySelector("#btns-cont");
			const saveBtn = document.createElement("button");
			saveBtn.innerText = "Save";
			saveBtn.style.display = "inline-block";
			btnCont?.appendChild(saveBtn);
			codeInputed.value = obj.codeBlock;
			title.value = h3.innerText;
			(<HTMLElement>e.target).parentElement?.remove();
			saveBtn.addEventListener("click", () => {
				parseCode(
					title.value,
					uuidv4(),
					codeInputed.value,
					languageSelector.value
				);
				saveBtn.style.display = "none";
				submitBtn.style.display = "inline-block";
				location.reload();
			});
		};
		// creating the code part
		const codeCont = document.querySelector("#codeCont") as HTMLDivElement;
		const pre = document.createElement("pre");
		const code = document.createElement("code");
		pre.appendChild(code);
		code.className = `snippet language-${obj.lang}`;
		code.innerText = obj.codeBlock;
		prism.hooks.add("before-sanity-check", function (env: any) {
			env.code = env.element.innerText;
		});
		prism.highlightElement(code);
		div.appendChild(h3);
		div.appendChild(pre);
		div.appendChild(deleteBtn);
		div.appendChild(editBtn);
		codeCont.append(div);
	}
};

checkLocalStorageAndRun();

// modal code

const modal = document.querySelector(".modal") as HTMLDivElement;
const howToUseBtn = document.querySelector(".how-to-use") as HTMLButtonElement;
const closeBtnModal = document.querySelector(
	".close-modal"
) as HTMLButtonElement;

howToUseBtn.addEventListener("click", () => {
	modal.style.visibility = "visible";
});
closeBtnModal.addEventListener("click", () => {
	modal.style.visibility = "hidden";
});
