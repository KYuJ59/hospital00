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
        // li.forEach((item)=>{
        //     item.addEventListener('mousedown',()=>{
        //         stop()
        //     })
        // })
    }
    
    function auto(){
        endTime=Date.now()+duration*1000;
        timer=Math.max(0,Math.floor((endTime-Date.now())/1000))
        circles(timer)
    }

    function next(){
        currentIndex++;
        if(currentIndex>maxIndex){
            currentIndex=0;
        };
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
    const list=document.querySelector('#staffIntro_staffList');
    const li=document.querySelectorAll('#staffIntro_staffList>li');
    const prevBtn=document.querySelector('#si_prevBtn');
    const nextBtn=document.querySelector('#si_nextBtn');

    let w768=window.innerWidth<=768
    let w1024=window.innerWidth<=1024

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

    let isDragg=false;


    let downX=null;

    init();
    initEvent();
    function init(){

    }
    function initEvent(){
        nextBtn.addEventListener('click',next);
        prevBtn.addEventListener('click',prev);
        window.addEventListener('resize',rs);
        window.addEventListener('load',rs);
        list.addEventListener('mousedown',(e)=>{
            down(e)
            // if(isDragg==true){
                document.addEventListener('mouseup',cDrag)
            // }
        })
    }

    function down(e){
        gsap.killTweensOf(list)
        downX=e.pageX
        list.addEventListener('mousemove',drag)
    }

    function drag(e){
        currentX=list.offsetLeft
        endX=e.pageX
        moveX=endX-downX
        if(Math.abs(moveX)!=2){
            isDragg=true

            gsap.set(list,{left:-(liWidth*currentIndex)+moveX})

            if(!w768){
                newIndex=Math.round((-1*currentX)/liWidth)
                if(newIndex>maxIndex){
                    newIndex=maxIndex;
                };
                if(newIndex<0){
                    newIndex=0;
                };
                btnActivatin(newIndex)
            }
        }


    }
    function cDrag(){
        isDragg=false
        list.removeEventListener('mousemove',drag)
        w768=window.innerWidth<=768
        if(w768){
            console.log(w768)
            endX<downX&&currentIndex++;
            endX>downX&&currentIndex--;
            if(currentIndex>maxIndex){
                currentIndex=maxIndex;
            };
            if(currentIndex<0){
                currentIndex=0;
            };
            slide(currentIndex);
        }else{
            currentIndex=newIndex
        }
        slide(currentIndex)
        console.log(currentIndex)
    }

    function next(){
        currentIndex++;
        if(currentIndex>maxIndex){
            currentIndex=maxIndex;
        };
        slide(currentIndex);
        btnActivatin(currentIndex);
        console.log(currentIndex)
    }
    function prev(){
        currentIndex--;
        if(currentIndex<0){
            currentIndex=0;
        };
        slide(currentIndex);
        btnActivatin(currentIndex);
        console.log(currentIndex)
    }

    function slide(i){
        gsap.killTweensOf(list)
        gsap.to(list,{left:-liWidth*i, duration:1.5});
        if(window.innerWidth<=768){
            selected.classList.contains('activ') && selected.classList.remove('activ')
            !li[currentIndex].classList.contains('activ')&&li[currentIndex].classList.add('activ')
        }
        selected=li[currentIndex]
    }

    function btnActivatin(i){
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

        if(w768){
            maxIndex=li.length-1;
            selected=li[currentIndex]
            !selected.classList.contains('activ') && selected.classList.add('activ')
        }else if(w1024){
            maxIndex=li.length-1;
            selected=li[currentIndex]
            selected.classList.contains('activ') && selected.classList.remove('activ')
        }else{
            maxIndex=li.length-3;
        }

        liGap=li[1].offsetLeft-li[0].offsetLeft-li[0].offsetWidth
        liWidth=li[0].offsetWidth+liGap;
        gsap.set(list,{left:-liWidth*currentIndex});
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

    let inners=null;

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

    let gap=li[1].offsetLeft-li[0].offsetLeft-li[0].offsetWidth
    let liWidth=li[0].offsetWidth+gap
    let actBtn=dots[0]

    let currentIndex=0;
    let maxIndex=2;

    let currentX=list.offsetLeft;
    let downX=null;
    let upX=null;
    let moveX=null;
    let endX=-(list.offsetWidth-wrap.offsetWidth)

    let isDragg=false;


    initEvent()
    function initEvent(){
        window.addEventListener('resize',rs)
        window.addEventListener('load',rs)
        dots.forEach((item,index)=>{
            item.addEventListener('click',()=>{
                slide(index)
                btnAct(index)
                currentIndex=index
            })
        })


        aLink.forEach(item=>{
            item.addEventListener('click',(e)=>{
                isDragg && (e.preventDefault())
            })})
        list.addEventListener('pointerdown',(e)=>{
            e.preventDefault();
            downX=e.pageX
            down(e)
            document.addEventListener('pointerup',cdragg)
        })
    }

    function rs(){
        gap=li[1].offsetLeft-li[0].offsetLeft-li[0].offsetWidth
        liWidth=li[0].offsetWidth+gap
        if(window.innerWidth<=768){
            maxIndex=4
            indexRs()
        }else if(window.innerWidth<=1024){
            maxIndex=3
            indexRs()
        }else{
            maxIndex=2
            indexRs()
        }
        gsap.set(list,{left:-liWidth*currentIndex})
    }

    function indexRs(){
        if(currentIndex>=maxIndex){
            currentIndex=maxIndex
            btnAct(currentIndex)
        }
    }

    function down(e){
        gsap.killTweensOf(list)
        document.addEventListener('pointermove',dragg)
    }
    function dragg(e){
        upX=e.pageX
        moveX=upX-downX
        endX=-(list.offsetWidth-wrap.offsetWidth)
        if(Math.abs(moveX)>=2){
            isDragg=true
            newIndex=Math.floor(-1*currentX/list.offsetWidth*10)
            if(newIndex>=maxIndex){
                newIndex=maxIndex
            }
            if(newIndex<0){
                newIndex=0
            }
    
            if(list.offsetLeft>0 || list.offsetLeft<endX){
                gsap.set(list,{left:-liWidth*currentIndex+(moveX/2)})
            }else{
                gsap.set(list,{left:-liWidth*currentIndex+moveX})
            }
        }

        currentX=list.offsetLeft

    }
    function cdragg(){
        document.removeEventListener('pointermove',dragg)
        currentIndex=newIndex
        slide(currentIndex)
        btnAct(currentIndex)
        // if(isDragg==true){
        //     aLink.forEach(item=>item.addEventListener('click',(e)=>e.preventDefault()))
        // }

        // isDragg && aLink.forEach(item=>
        //     item.addEventListener('click',(e)=>
        //         e.preventDefault()
        // ))
    }

    function btnAct(i){
        actBtn!=dots[i]&&actBtn.classList.remove('act')
        dots[i].classList.add('act')
        actBtn=dots[i]
    }

    function slide(i){
        gsap.to(list,{left:-liWidth*i,onComplete:()=>{isDragg=false}})
        // isDragg && (isDragg=false);
    }

}