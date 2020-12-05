const btnAddFile = document.querySelector('.js-add-file');
const btnRemoveFile = document.querySelector('.js-remove--user-upload');
const userUploadsBlock = document.querySelector('.action-box__added-files');




btnAddFile.addEventListener('change', handleChange)

userUploadsBlock.addEventListener('click', function(e){
	if(!e.target === userUploadsBlock) return;
	removeFile(e.target.dataset.removeIndex);
	renderFiles(FilesStore.userFiles);
})



const FilesStore = {
 	userFiles: []
}


function handleChange(e) {

  if (!e.target.files.length) {
    return;
  }

  const files = Object.keys(e.target.files).map((i) => e.target.files[i]);
 
  addFiles(files); 
  renderFiles(FilesStore.userFiles);
   e.target.value = '';
}

function renderFiles(filesData) {
	
	let uploadsToRender = '';
	for (let i = filesData.length - 1; i >= 0; i--) {
		uploadsToRender += `
		<div class="action-box__user-file">
			<div class="action-box__user-file-name">${filesData[i].name}</div>
			<div class="action-box__user-file-del js-remove--user-upload" data-remove-index='${i}'>Удалить</div>
		</div>
		`;
	}
	userUploadsBlock.innerHTML = uploadsToRender;

}

function addFiles(files) {
  FilesStore.userFiles = FilesStore.userFiles.concat(files);

}


function getFilesFormData(files) {
    const formData = new FormData();

    files.map((file, index) => {
        formData.append(`file${index + 1}`, file);
    });

    return formData;
}

function removeFile(index) {
  FilesStore.userFiles.splice(index, 1);
}


















function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}

class CustomSelect {
	constructor() {
		this.select = document.querySelectorAll('.custom-select');
		this.selectActiveClass = 'custom-select--is-active';
		this.selectDisabledClass = 'custom-select--is-disabled';
		this.vacancyList = document.querySelector('.vacancy-mailing__mailing-boxes');
		this.boxes = document.querySelectorAll('.mailing-box');
		this.skills = document.querySelectorAll('.js-input-skill');
		this.newMailBtn = document.querySelector('.vacancy-mailing__new-mail-btn');
		this.counter = 1;
		this.isActive = 0;
		this.init();
	}
	init() {
		this.events();
	}

	events() {
		const self = this;
		this.vacancyList.addEventListener('click', function(e) {
			let select = event.target.closest('.custom-select')
			if (!select) return
			self.toggleState(select);
			// получать нужного родителя, сейчас получает только перый, проблема где-то тут

		})
		this.newMailBtn.addEventListener('click', function(e) {
			self.renderNewParams(e)
		})
		this.onCatSelect();

		this.changeSkills();

		

		this.vacancyList.addEventListener('skillsChange', function(e) {
			const skills = this.querySelector('.mailing-box__selected-skills')

			skills.innerHTML += `

				<li class='mailing-box__skill'>${e.detail.label}</li>
			`;

			
		})
	}


	onCatSelect() {
		const self = this;
		this.vacancyList.addEventListener('click', function(e) {
			let input = e.target.closest('.js-custom-select-cat')
			let parentContainer = findAncestor(e.target, 'mailing-box')

			if (!parentContainer) return
			if (!input) return
			if (!self.vacancyList.contains(input)) return;

			console.log(e.target)
			let disabledSelect = parentContainer.querySelector('.custom-select--is-disabled')
			if (disabledSelect) {
				disabledSelect.classList.remove(self.selectDisabledClass);
			}
			parentContainer.querySelector('.mailing-box__selected-cat').innerHTML = input.innerHTML;

		})
	}

	changeSkills() {
		const self = this;
		this.vacancyList.addEventListener('click', function(e){

			if (!e.target.classList.contains('js-input-skill')) return
			let label = e.target.id;

			
			let skillsChange = new CustomEvent('skillsChange', {
				bubbles: true, 
				composed: true,
				detail: {
					label: label,
					skillsBox: parentContainer
				}
			});
			this.dispatchEvent(skillsChange)
		})
	}

	toggleState(that) {
		const self = this;
		if (that.classList.contains('custom-select--is-disabled')) return

		if (!that.classList.contains(this.selectActiveClass)) {
			for (let i = document.querySelectorAll('.custom-select').length - 1; i >= 0; i--) {
				document.querySelectorAll('.custom-select')[i].classList.remove(self.selectActiveClass)
			}
			that.classList.add(self.selectActiveClass)
		} else {
			for (let i = document.querySelectorAll('.custom-select').length - 1; i >= 0; i--) {
				document.querySelectorAll('.custom-select')[i].classList.remove(self.selectActiveClass)
			}
		}

	}
	

	renderNewParams(event) {
		const self = this;
		event.preventDefault();
		this.counter++;
		this.vacancyList.innerHTML += `
		<div class="mailing-box" id='mailing-box-${this.counter}'>
			<h3 class="action-box__title-sm">Параметры рассылки вакансий <span>#${this.counter}</span></h3>
			<div class="custom-select custom-select--cat">
				<div class="custom-select__field action-box__field">
					<input type="search" placeholder='Выберите категорию' class="action-box__input custom-select__input">
				</div>	
				<ul class="custom-select__values">
					<li class="custom-select__value js-custom-select-cat">Category-1</li>
					<li class="custom-select__value js-custom-select-cat">Category-2</li>
					<li class="custom-select__value js-custom-select-cat">Category-3</li>
					<li class="custom-select__value js-custom-select-cat">Category-4</li>
					<li class="custom-select__value js-custom-select-cat">Category-5</li>
					<li class="custom-select__value js-custom-select-cat">Design</li>
					<li class="custom-select__value js-custom-select-cat">Marketing</li>
				</ul>
			</div>
			<div class="custom-select custom-select--skills custom-select--is-disabled">
				<div class="custom-select__field action-box__field">
					<input type="search" placeholder='Выберите навыки' class="action-box__input custom-select__input">
				</div>	
				<ul class="checkboxes custom-select__values">
					<li class="checkboxes__checkbox custom-select__value">
						<input type="checkbox" class='checkboxes__input' id='php'>
						<label class="checkboxes__label" for="php">PHP</label>
					</li>
					<li class="checkboxes__checkbox custom-select__value">
						<input type="checkbox" class='checkboxes__input' id='MySQL'>
						<label class="checkboxes__label" for="MySQL">MySQL</label>
					</li>
					<li class="checkboxes__checkbox custom-select__value">
						<input type="checkbox" class='checkboxes__input' id='HTML'>
						<label class="checkboxes__label" for="HTML">HTML</label>
					</li>
					<li class="checkboxes__checkbox custom-select__value">
						<input type="checkbox" class='checkboxes__input' id='PHPMyAdmin'>
						<label class="checkboxes__label" for="PHPMyAdmin">PHPMyAdmin</label>
					</li>
					<li class="checkboxes__checkbox custom-select__value">
						<input type="checkbox" class='checkboxes__input' id='C++'>
						<label class="checkboxes__label" for="C++">C++</label>
					</li>
					<li class="checkboxes__checkbox custom-select__value">
						<input type="checkbox" class='checkboxes__input' id='Design'>
						<label class="checkboxes__label" for="Design">Design</label>
					</li>
					<li class="checkboxes__checkbox custom-select__value">
						<input type="checkbox" class='checkboxes__input' id='Marketing'>
						<label class="checkboxes__label" for="Marketing">Marketing</label>
					</li>
				</ul>
			</div>
			<div class="mailing-box__selected-info">
				<h3 class="action-box__title-sm">Категория</h3>
				<div class="mailing-box__selected-cat"></div>
				<ul class="mailing-box__selected-skills">
				</ul>
			</div>
		</div>
		`
	}

}

const select = new CustomSelect();