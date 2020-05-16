const btnAddFile = document.querySelector('.js-add-file');
const btnRemoveFile = document.querySelector('.js-remove--user-upload');
const userUploadsBlock = document.querySelector('.action-box__added-files');




btnAddFile.addEventListener('change', handleChange)

userUploadsBlock.addEventListener('click', function(e){
	if(!e.target === userUploadsBlock) return;
	console.log(e.target.dataset.removeIndex)
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
