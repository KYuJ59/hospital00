loginSave()

function loginSave(){
    const save=document.querySelector('#saveCheck')
    const logIfC=document.querySelector('#checkCustom')


    save.addEventListener('click',act)
    logIfC.addEventListener('click',act)
    function act(){
        logIfC.classList.toggle('act')
    }
}

joinKakao()
function joinKakao(){
    const langBtn=document.querySelector('#jKLang_btn')

    const selectBox=document.querySelector('#jK_footLang')
    const icon=document.querySelector('#jKLang_downIcon')

    let open=false;
    

    function act(){
        selectBox.style.display='block'
        icon.style.transform='rotate(180deg)'
        open=true
    }
    function deAct(){
        selectBox.style.display='none'
        icon.style.transform='rotate(0)'
        open=false
    }
    
    langBtn.addEventListener('click',()=>{
        const isHidden = window.getComputedStyle(selectBox).display === 'none';
        (isHidden) ? act() : deAct()
    })

    document.addEventListener('click',outsideOff)

    function outsideOff(e){
        if(!selectBox.contains(e.target)&&!langBtn.contains(e.target)){
            deAct()
        }
    }
    
    
}