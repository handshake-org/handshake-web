(function() {
	const flashmessagecontainer = document.querySelector('.flashmessage-container')
	const closeFlashMessage = document.querySelector('.close-flash-message')

	if (closeFlashMessage) {
		closeFlashMessage.addEventListener('click', function(){
			flashmessagecontainer.style.display = 'none'
		})
	}

	if (flashmessagecontainer) {
		setTimeout(function(){
			flashmessagecontainer.style.display = 'none'
		}, 8200)
	}
}())
