
document.addEventListener('DOMContentLoaded',()=>{
	const wrap=document.querySelector('#map_mapBox')
	const panel=document.querySelector('.mapPanel')

	const map=(w,h)=>{
		panel.innerHTML="";
		new daum.roughmap.Lander({
			"timestamp" : "1745288346030",
			"key" : "2nsax",
			"mapWidth" : w,
			"mapHeight" : h
		}).render();
	}

	let wW=null;

	function mapSizing(){
		if(window.innerWidth<=768){
			if(wW!=768){
				wW=768
				map(715,787)
			}
		}else{
			if(wW!="full"){
				wW="full"
				map(1200,574)
			}
		}
	}

	window.addEventListener('load',mapSizing)
	window.addEventListener('resize',mapSizing)


})
