
document.addEventListener('DOMContentLoaded',()=>{
	const panel=document.querySelector('.mapPanel')

	let mWidth=panel.offsetWidth
	let mHeight=panel.offsetHeight
	map()
	function map() {
		mWidth=panel.offsetWidth
		mHeight=panel.offsetHeight
		panel.innerHTML="";
		new daum.roughmap.Lander({
			"timestamp" : "1745288346030",
			"key" : "2nsax",
			"mapWidth" : mWidth,
			"mapHeight" : mHeight
		}).render();
	}

	window.addEventListener('resize',map)

})
