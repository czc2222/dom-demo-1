
window.dom = {
    create(string){
        const container = document.createElement('template');
        container.innerHTML = string.trim()
        return container.content.firstChild
    },//创建任意标签
    after(node,node2){
        console.log(node.nextSibling)
        node.parentNode.insertBefore(node2,node.nextSibling)//在node节点新增一个弟弟node2
        
    },
    before(node,node2){
        node.parentNode.insertBefore(node2,node)//在node节点新增一个哥哥node2
        
    },
    append(parent,node2){
        parent.appendChild(node2)//新增一个儿子node2
    },
    wrap(node2,parent){
        dom.before(node2,parent)
        dom.append(parent,node2)
    },//在node2上新增一个爸爸parent
    remove(node2){
        node2.parentNode.removeChild(node2)
        return node2 //删除node2节点
    },
    empty(node){
        const {childNodes}=node//const childNodes = node.ChildNodes 简写成 const{childNodes} =node
        const array=[]
        let x =node.firstChild
         while (x){
             array.push(dom.remove(node.firstChild))//dom.remove(childNodes[i]);array.push(childNodes[i])的简写
             x =node.firstChild//x=第2个节点继续循环删除

        }
        return array//打出所有儿子
    },
    attr(node,name,value){
        if(arguments.length ===3){
            node.setAttribute(name,value)
        }else if(arguments.length === 2){
            return node.getAttribute(name)
        }
        
    },//读写属性
    text(node,string){//适配
        if(arguments.length===2){
            if('innerText' in node){
                node.innerText = string 
    
            }else{
                node.textContent =string 
            }
        }else if(arguments.length===1){
            if('innerText' in node){
                return node.innerText
            }
        }else{
            return node.textContent
        }
       //读写文本内容
    },
    html(node,string){
        if(arguments.length===2){
            node.innerHTML = string
        }else if(arguments.length===1){
            return node.innerHTML
        }
    },//读写html
    style(node,name,value){
        if(arguments.length===3){
            //dom.style(div,'color','red')
            node.style[name]=value
        }else if(arguments.length ===2){
            if(typeof name === 'string'){
                //dom.style(div,'color')
            return node.style[name]
            }else if(name instanceof Object){
                //dom.style(div,{color:'red'})
                const object =name
                for(let key in object){
                    //key:border/color
                    //node.style.border =....
                    //node.style.color = ....由于border和color属性一直在变，所以不能node.style.key，要放在[]里面
                    node.style[key] =object[key]
        
                }
            
            }
      
        }
    },//读写style
    class:{
        add(node,className){
           node.classList.add(className)
        },//添加class
        remove(node,className){
            node.classList.remove(className)
        },//删除class
        has(node,className){
           return node.classList.contains(className)
        }//检查是否有这个class
        
    },
    on(node,eventName,fn){
        node.addEventListener(eventName,fn)
    },//监听点击事件
    off(node,eventName,fn){
        node.removeEventListener(eventName,fn)
    },//删除点击事件
    find(selector,scope) {
        return (scope ||document).querySelectorAll(selector)
    },//查询id为test的div，结合main.js,scope是范围
    parent(node){
        return node.parentNode
    },//找爸爸
    children(node){
        return node.children
    },//找子女
    siblings(node){
        return Array.from(node.parentNode.children).filter(n=>n!==node)
    },//找兄弟姐妹，children伪数组变成数组，然后filter 过滤
    next(node){
        let x=node.nextSibling
        while(x && x.nodeType === 3){
            x = x.nextSibling
        }
        return x
    },//找弟弟 3是文本节点
    previous(node){
        let x = node.previousSibling
        while(x && x.nodeType === 3){
            x = x.previousSibling
        }
        return x
    },//找哥哥
 each(nodeList,fn){
     for(let i=0;i<nodeList.length;i++){
         fn.call (null,nodeList[i])
     }
 },//遍历所有节点
 index(node){
     const list = dom.children(node.parentNode)
     let i
     for(i=0;i<list.length;i++){
         if(list[i]===node){
             break
             
         }
     }
     return i
 }//查排行老几 注意如果在for循环中声明i，那么会出现i没有定义
}
