

header()
function header(){
    const header=document.querySelector('#headerWrap');
    const mainA=document.querySelectorAll('#mainMenu_list>li>a');
    const loginBtn=document.querySelector('#login');
    const subBg=document.querySelector('#navBg');
    const subMenus=document.querySelectorAll('.subMenu_list');

    let fixed=false;

    for(item of mainA){
        item.addEventListener('mouseenter',activate);
    }

    function activate(){
        gsap.set(header,{borderBottom:'solid 2px #5aa933',background:'#ffffff'});
        gsap.set(mainA,{color:'#000000'});
        gsap.set(loginBtn,{borderColor:'#5aa933',background:'#5aa933'});
        gsap.to(subBg,{display:'block',opacity:1});
        gsap.to(subMenus,{display:'block',opacity:1});
    }

    header.addEventListener('mouseleave',deActivate)

    function deActivate(){
        if(fixed==false){
            gsap.set(header,{borderBottom:'solid 1px #dddddd',background:'transparent'});
            gsap.set(mainA,{color:'#ffffff'});
            gsap.set(loginBtn,{borderColor:'#ffffff',background:'transparent'});
        }
        gsap.to(subBg,{opacity:0,display:'none'});
        gsap.to(subMenus,{opacity:0,display:'none'});
    }
    //스크롤 헤더픽스
    const urlInfo=location.href;
    const startIndex=urlInfo.lastIndexOf('/')
    const fileName=urlInfo.substr(startIndex+1)
    window.addEventListener('load',()=>{
        (fileName==='login.html') ? actFix():fix()
    })
    function fix(){
        window.addEventListener('scroll',()=>{
            window.scrollY>=80 ? actFix() : deActFix()
        })
    }
    function actFix(){
        gsap.set(header,{borderBottom:'solid 2px #5aa933',background:'#ffffff'});
        gsap.set(mainA,{color:'#000000'});
        gsap.set(loginBtn,{borderColor:'#5aa933',background:'#5aa933'});
        fixed=true;
    }
    function deActFix(){
        gsap.set(header,{borderBottom:'solid 1px #dddddd',background:'transparent'});
        gsap.set(mainA,{color:'#ffffff'});
        gsap.set(loginBtn,{borderColor:'#ffffff',background:'transparent'});
        fixed=false;
    }

}

//모바일 네비 여닫기
mobMenu()
function mobMenu(){
    const wrap=document.querySelector('#mobMenuWrap');
    const openBtn=document.querySelector('#mobMenuBtn');
    openBtn.addEventListener('click',()=>{
        wrap.style.display='block';
        gsap.set(document.body,{overflow:'hidden'})
        document.body.style.overflow='hidden';
    });
    const closeBtn=document.querySelector('#moMenu_closeBtn');
    closeBtn.addEventListener('click',()=>{
        wrap.style.display='none';
        document.body.style.overflow='visible';
    });

}

//모바일네비 서브메뉴 여닫기
accordion()
function accordion(){
    const list=document.querySelectorAll('#mobMenu_list>li');
    const defaultHeight=38;
    const liHeight=45
    let selected=null;
    let act=false;

    const reset=()=>{
        let a=selected.children[0]
        gsap.to(selected,{height:defaultHeight});
        gsap.set(a,{borderBottomColor:'rgba(90,169,51,0)'});
        selected.classList.remove('activate');
        selected=null;
        return selected;
    };


    //모바일 네비 닫을때
    const closeBtn=document.querySelector('#moMenu_closeBtn');
    closeBtn.addEventListener('click',()=>{
        selected!=null && reset()
    });

    list.forEach((item)=>{

        //모바일메뉴 여닫기
        item.addEventListener('click',()=>{
            let a=item.children[0];
            let liLength=item.querySelectorAll('ul>li').length;

            const openMenu=(s)=>{
                act=true;
                s.classList.add('activate');
                gsap.to(a,{borderBottomColor:'rgba(90,169,51,1)',duration:0.2});
                gsap.to(s,{height:defaultHeight+(liHeight*liLength),duration:0.2,onComplate:()=>{
                    act=false;
                }});
            };
            const closeMenu=(s)=>{
                s.classList.remove('activate');
                gsap.set(a,{borderBottomColor:'rgba(90,169,51,0)'});
                gsap.to(s,{height:defaultHeight,duration:0.2});
            };

            const selValid=selected!=null && selected!=item
            if(selValid){
                act && gsap.killTweensOf(selected)
                closeMenu(selected)
            }
            selected!=item ? (
                selected=item,
                openMenu(selected)
            ):(
                act && gsap.killTweensOf(selected),
                closeMenu(item),
                selected=null
            )

            return selected;
        });

    });

}

showing()

function showing(){
    function upDown(target,del){
        target.forEach((item)=>{
            const trigger=item.closest('.triggerBox');
            gsap.to(item,{y:0,opacity:1,duration:del,
                scrollTrigger:{
                    trigger:trigger,
                    start:'top 70%',
                    toggleActions:'play none none none',
                    markers:false
                },
                onComplete:()=>{
                    if(item.classList.contains('aftUn'))item.classList.add('titleUnder')
                }
            })
        })
    }
    const upper=document.querySelectorAll('.upTrigger')
    upDown(upper,1.2)
    const dUpper=document.querySelectorAll('.upTrigger_d')
    upDown(dUpper,1.6)
    const downer=document.querySelectorAll('.downTrigger')
    upDown(downer,1.2)
    const dDowner=document.querySelectorAll('.downTrigger_d')
    upDown(dDowner,1.6)
}
// login()
// function login(){
//     const loginBtn=document.querySelector('#login')

//     loginBtn.addEventListener('click',()=>{
//         location.href='https://kyuj59.github.io/hospital00/members/login.html'
//     })
// }