//메인비주얼 슬라이더
slider0()
    
//의료진소개 슬라이더
slider1()

//진료과목 탭
subject()

//휴먼티비 슬라이더
slider2()

function slider0(){
    const prevBtn=document.querySelector('#mainVis_prevBtn');
    const nextBtn=document.querySelector('#mainVis_nextBtn');
    const li=document.querySelectorAll('#mainVis_cardList>li');
    const bg=document.querySelectorAll('#mainVis_dotBox>button')

    let currentIndex=0;
    let maxIndex=li.length-1;
    let selected=li[0];

    let duration= 6;
    let endTime=null;

    let timer=null;

    const circle=document.querySelectorAll('circle');
    let selectedCi=null;
    let selBg=null;

    auto()
    initEvent();

    function initEvent(){
        document.addEventListener('visibilitychange',()=>{
            if(document.visibilityState=='visible'){
                auto()
            }else{
                stop()
            }
        })
        nextBtn.addEventListener('click',()=>{
            stop()
            next()
        });
        prevBtn.addEventListener('click',()=>{
            stop()
            prev()
        });

    }
    function auto(){
        endTime=Date.now()+duration*1000;
        timer=Math.max(0,Math.floor((endTime-Date.now())/1000))
        circles(timer)
    }

    function next(){
        currentIndex++;
        currentIndex>maxIndex && (currentIndex=0)
        slide();
    }
    function prev(){
        currentIndex--;
        if(currentIndex<0){
            currentIndex=maxIndex;
        };
        slide();
    }
    function slide(){
        gsap.to(selected,{opacity:0});
        gsap.to(li[currentIndex],{opacity:1,onCoplete:()=>{
            selected=li[currentIndex];
            auto();
        }});
    };

    function circles(timer){
        if(selectedCi!=null){
            gsap.set(selectedCi,{r:2,fill:'#ffffff'})
            gsap.set(selBg,{background:'none'})
        }
        gsap.set(bg[currentIndex],{background:'url("./images/inf.png")no-repeat center'})
        gsap.set(circle[currentIndex],{fill:'transparent',r:10,strokeDasharray:62.8,strokeDashoffset:62.8});
        gsap.to(circle[currentIndex],{strokeDashoffset:0,duration:timer,ease:'none', onComplete:()=>{
            selectedCi=circle[currentIndex];
            selBg=bg[currentIndex]
            next();
        }});
    };

    function stop(){
        gsap.killTweensOf(circle[currentIndex])
        gsap.set(circle[currentIndex],{r:2,fill:'#ffffff'})
        gsap.set(bg[currentIndex],{background:'none'})
    }
}


function slider1(){
    const wrap=document.querySelector('#staffIntro_staffBox')
    const list=document.querySelector('#staffIntro_staffList');
    const li=document.querySelectorAll('#staffIntro_staffList>li');
    const prevBtn=document.querySelector('#si_prevBtn');
    const nextBtn=document.querySelector('#si_nextBtn');

    let w768=window.innerWidth<=768
    let w1024=window.innerWidth<=1024

    const windowCalc=(a,b,c)=>{
        const inner=window.innerWidth
        let result=null;
        if(inner<=768){
            result=a
        }else if(inner<=1024){
            result=b
        }else{
            result=c
        }
        return result;
    }

    let currentIndex=0;
    let maxIndex=li.length-3;
    let liGap=li[1].offsetLeft-li[0].offsetLeft-li[0].offsetWidth
    let liWidth=li[0].offsetWidth+liGap;
    let pBtnAct=false;
    let nBtnAct=true;

    let currentX=list.offsetLeft
    let newIndex=null;
    let moveX=null;

    let selected=null;

    let isDrag=false;

    let downX=null;
    let upX=null;
    let endX=null;
    let startX=null;

    init();
    initEvent();
    function init(){

    }
    function initEvent(){
        nextBtn.addEventListener('click',next);
        prevBtn.addEventListener('click',prev);
        window.addEventListener('resize',rs);
        window.addEventListener('load',rs);
        list.addEventListener('pointerdown',(e)=>{
            downX=e.pageX
            startX=list.offsetLeft
            endX=-(list.offsetWidth-wrap.offsetWidth)
            down(e)
        })
        list.addEventListener('touchstart',(e)=>{
            downX=e.touches[0].pageX
            startX=list.offsetLeft
            endX=-(list.offsetWidth-wrap.offsetWidth)
            down(e)
        })
        document.addEventListener('pointerup',cDrag)
        document.addEventListener('touchend',cDrag)
        
    }

    function down(){
        gsap.killTweensOf(list)
        window.addEventListener('pointermove',drag)
    }

    function drag(e){
        currentX=list.offsetLeft
        upX=e.pageX || e.touches[0].pageX
        moveX=upX-downX

        if(Math.abs(moveX)>2){
            isDrag=true
            newIndex=Math.round(-currentX/liWidth)
            if(newIndex>maxIndex) newIndex=maxIndex;
            if(newIndex<0) newIndex=0;
            if(currentIndex==0 && moveX>0 || currentIndex==maxIndex && moveX<0){
                const resistance=rstDrag()
                gsap.set(list,{left:startX+resistance})
            }else{
                gsap.set(list,{left:startX+moveX})
            }
            btnActivatin()
        }
    }
    function rstDrag(){
        const over=moveX<0 ? Math.min(0,moveX):Math.max(0,moveX)
        const resistance=0.5/(Math.abs(over)/300+1)
        return moveX-over+over*resistance
    }
    function cDrag(){
        if(isDrag){
            isDrag=false
            window.removeEventListener('pointermove',drag)
            w768=window.innerWidth<=768
            if(w768){
                endX<downX&&currentIndex++;
                endX>downX&&currentIndex--;
                if(currentIndex>maxIndex){
                    currentIndex=maxIndex;
                };
                if(currentIndex<0){
                    currentIndex=0;
                };
                slide();
            }else{
                currentIndex=newIndex
            }
            slide()
        }
    }

    function next(){
        currentIndex++;
        if(currentIndex>maxIndex)currentIndex=maxIndex;
        slide(currentIndex);
        btnActivatin();
    }
    function prev(){
        currentIndex--;
        if(currentIndex<0)currentIndex=0;
        slide(currentIndex);
        btnActivatin();
    }

    function slide(){
        gsap.killTweensOf(list)
        gsap.to(list,{left:-liWidth*currentIndex, duration:1.5});
        if(window.innerWidth<=768){
            selected.classList.contains('activ') && selected.classList.remove('activ')
            !li[currentIndex].classList.contains('activ')&&li[currentIndex].classList.add('activ')
        }
        selected=li[currentIndex]
    }

    function btnActivatin(){
        isDrag ? (i=newIndex):(i=currentIndex)
        if(i==0){
            gsap.set(prevBtn,{backgroundColor:'rgba(0,0,0,0.2)'});
            pBtnAct=false;
        }
        if(i>=1 && pBtnAct==false){
            gsap.set(prevBtn,{backgroundColor:'#5aa933'});
            pBtnAct=true;
        };
        if(i==maxIndex){
            gsap.set(nextBtn,{backgroundColor:'rgba(0,0,0,0.2)'});
            nBtnAct=false;
        }
        if(i<=maxIndex-1 && nBtnAct==false){
            gsap.set(nextBtn,{backgroundColor:'#5aa933'});
            nBtnAct=true;
        }
    }

    function rs(){
        w768=window.innerWidth<=768
        w1024=window.innerWidth<=1024
        maxIndex=windowCalc(5,4,3)
        indexRs()

        if(w768){
            selected=li[currentIndex]
            !selected.classList.contains('activ') && selected.classList.add('activ')
        }else if(w1024){
            selected=li[currentIndex]
            selected.classList.contains('activ') && selected.classList.remove('activ')
        }

        liGap=li[1].offsetLeft-li[0].offsetLeft-li[0].offsetWidth
        liWidth=li[0].offsetWidth+liGap;
        gsap.set(list,{left:-liWidth*currentIndex});
    }
    function indexRs(){
        if(currentIndex>=maxIndex){
            currentIndex=maxIndex
        }
        btnActivatin()
    }
}


function subject(){
    const panel=document.querySelector('#subject_tabBox');
    const idC_btn=document.querySelector('#idCenter_tabBtn');
    const imgC_btn=document.querySelector('#imgCenter_tabBtn');

    
    const tapInner=(subject)=>{
        axios.get(`https://kyuj59.github.io/hospital00/subject/${subject}.html`).then((res)=>{
            panel.innerHTML=res.data;
        })
    }

    init()
    initEvent()
    function init(){
        inners=tapInner('idCenter')
    };
    function initEvent(){
        idC_btn.addEventListener('click',changeTIdC);
        imgC_btn.addEventListener('click',changeTImgC);
    };

    function changeTIdC(){
        if(idC_btn.classList.contains('subjectTab_deAct')){
            idC_btn.classList.remove('subjectTab_deAct')
            imgC_btn.classList.add('subjectTab_deAct')
            inners=tapInner('idCenter')
        }
    };

    function changeTImgC(){
        if(imgC_btn.classList.contains('subjectTab_deAct')){
            idC_btn.classList.add('subjectTab_deAct')
            imgC_btn.classList.remove('subjectTab_deAct')
            inners=tapInner('imgCenter')
        }
    }
}

function slider2(){
    const list=document.querySelector('#humanTV_tvList')
    const li=document.querySelectorAll('#humanTV_tvList>li')
    const wrap=list.parentElement
    const aLink=document.querySelectorAll('#humanTV_tvList>li>a')
    const dots=document.querySelectorAll('#humanTV_btnBox>button')

    let actBtn=dots[0]

    const windowCalc=(a,b,c)=>{
        const inner=window.innerWidth
        let result=null;
        if(inner<=768){
            result=a
        }else if(inner<=1024){
            result=b
        }else{
            result=c
        }
        return result;
    }

    let currentIndex=0;
    let newIndex=null;

    let currentX=list.offsetLeft;
    let downX=null;
    let upX=null;
    let moveX=null;
    let endX=-(list.offsetWidth-wrap.offsetWidth)
    let startX=null;

    let isDrag=false;

    let gap=null;
    let liWidth=null;
    let maxIndex=null;


    initEvent()
    function initEvent(){
        window.addEventListener('resize',rs)
        window.addEventListener('load',rs);
        dots.forEach((item,index)=>{
            item.addEventListener('click',()=>{
                slide(index)
                btnAct(index)
                currentIndex=index
            })
        })

        aLink.forEach(item=>{
            item.addEventListener('click',(e)=>{
                isDrag && (e.preventDefault())
            })})
        list.addEventListener('pointerdown',(e)=>{
            e.preventDefault();
            downX=e.pageX
            startX=list.offsetLeft
            endX=-(list.offsetWidth-wrap.offsetWidth)
            down(e)
        })
        list.addEventListener('touchstart',(e)=>{
            e.preventDefault();
            downX=e.touches[0].pageX
            startX=list.offsetLeft
            endX=-(list.offsetWidth-wrap.offsetWidth)
            down()
        })
        list.addEventListener('touchend',cdrag)
        document.addEventListener('pointerup',cdrag)
    }


    function down(){
        gsap.killTweensOf(list)
        document.addEventListener('pointermove',drag)
    }
    function drag(e){
        upX=e.pageX || e.touches[0].pageX
        moveX=upX-downX

        currentX=list.offsetLeft

        if(Math.abs(moveX)>2){
            isDrag=true
            newIndex=Math.round(-currentX/liWidth)
            if(newIndex>=maxIndex) newIndex=maxIndex
            if(newIndex<0) newIndex=0
            if(currentIndex==0 && moveX>0 || currentIndex==maxIndex && moveX<0){
                const resistance=rstDrag()
                gsap.set(list,{left:startX+resistance})
            }else{
                gsap.set(list,{left:startX+moveX})
            }
        }
    }
    function rstDrag(){
        const over=moveX<0 ? Math.min(0,moveX):Math.max(0,moveX)
        const resistance=0.5/(Math.abs(over)/300+1)
        return moveX-over+over*resistance
    }
    function cdrag(){
        if(isDrag){
            document.removeEventListener('pointermove',drag)
            currentIndex=newIndex
            slide(currentIndex)
            btnAct(currentIndex)
        }
    }

    function btnAct(i){
        actBtn!=dots[i]&&actBtn.classList.remove('act')
        dots[i].classList.add('act')
        actBtn=dots[i]
    }

    function slide(i){
        gsap.to(list,{left:-liWidth*i,onComplete:()=>{isDrag=false}})
    }

    function rs(){
        gap=li[1].offsetLeft-li[0].offsetLeft-li[0].offsetWidth
        liWidth=li[0].offsetWidth+gap
        maxIndex=windowCalc(4,3,2)
        indexRs()

        gsap.set(list,{left:-liWidth*currentIndex})

    }
    
    function indexRs(maxIndex){
        if(currentIndex>=maxIndex){
            currentIndex=maxIndex
            btnAct(currentIndex)
        }
    }

}
