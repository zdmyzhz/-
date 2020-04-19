//链表节点类
class Node{

    constructor(value){

        this.value = value;
        this.next = null;
        this.prev = null;
    }
}
//单向链表
class LinkedList{

    //#head = 1;2020/4/2 chrome支持但是firefox不支持
    constructor(){
        //作为实例属性存在暴露风险
        this.head = null;
        this.length = 0;
    }
    // show(){
    //     return this.#head;
    // }

    //初始化链表为多少数据量
    init(num){

        this.clear();

        for(let i = 0;i < num;i++){
            this.append(i);
        }

        return this;

    }
    clear(){

        this.head = null;
        this.length = 0;
        
        return this;
    }
    //末尾添加一个节点
    append(elem){

        let element = new Node(elem);

        if(!this.head){

            this.head = element;

        } else {
            
            let currentNode = this.head;

            while(currentNode.next){

                currentNode = currentNode.next;

            }

            currentNode.next = element;

        }
        this.length++;
    }
    //指定位置插入一个节点
    insert(pos,elem){

        if(pos < 0 || pos > this.length){

            return false;

        } else {

            let element = new Node(elem);

            if(pos === 0){

                element.next = this.head;
                this.head = element

            } else {

                let currentNode = this.head;
                for(let i = 0; i < pos - 1 ;i++){
                    currentNode = currentNode.next;
                }

                element.next = currentNode.next;
                currentNode.next = element;
            }
            this.length++;
            return true;

        }

    }
    //移除指定位置元素
    removeAt(pos){

        if(pos < 0 || pos >= this.length){

            return false;

        } else {

            if(pos === 0){

                this.head = this.head.next;

            } else {

                let currentNode = this.head;

                for(let i = 0;i < pos - 1;i++){

                    currentNode = currentNode.next;

                }

                currentNode.next = currentNode.next.next;

            }
            this.length--;
            return true;

        }

    }
    indexOf(elem){

        let currentNode = this.head;

        for(let i = 0;i < this.length;i++){

            if (currentNode.value === elem){
                return i;
            }

            currentNode = currentNode.next;
        }

        return -1;

    }
    remove(elem){

        let pos = this.indexOf(elem);

        //return pos > -1 ? this.removeAt(pos) : false;这是自己已开始写的
        //其实可以不管搜索位置直接调用，毕竟removeAt里面对传入的数字进行了判断
        return this.removeAt(pos);

    }
    isEmpty(){
        return this.length === 0;
    }
    size(){
        return this.length;
    }
    getHead(){
        return this.head;
    }
    toString(){

        let strArr = [],
            currentNode = this.head;

        for(let i = 0;i < this.length;i++){

            strArr.push(currentNode.value);
            currentNode = currentNode.next;

        }

        return strArr.join(",");
    }
    print(){
        let nodeArr = [],
            currentNode = this.head;

        for(let i = 0;i < this.length;i++){

            nodeArr.push(currentNode);
            currentNode = currentNode.next;

        }

        console.log(nodeArr);
    }
}
//双向链表
class LinkedList_doubly extends LinkedList{

    constructor(){

        super();
        this.foot = null;

    }
    clear(){

        this.head = this.foot = null;
        this.length = 0;
        
        return this;
    }
    append(elem){

        let element = new Node(elem);

        if(!this.head){

            this.head = this.foot = element;

        } else {

            element.prev = this.foot;
            this.foot.next = element;
            this.foot = element;

        }
        this.length++;

    }
    insert(pos,elem){

        //插入位置在范围之外（可在0和length即末尾处插入）
        if(pos < 0 || pos > this.length){

            return false;

        } else {

            let element = new Node(elem);
            //链表长度为0时需要修改两个指针
            if(this.length === 0){

                this.head = this.foot = element;

            } else {
                //长度不为0
                //插入位置在首位
                if(pos === 0){

                    this.head.prev = element;
                    element.next = this.head;
                    this.head = element;
                //插入位置在末尾
                } else if(pos === this.length){

                    this.foot.next = element;
                    element.prev = this.foot;
                    this.foot = element;
                //插入位置在链表中间位置
                } else {
                    let after = "next",
                        before = "prev",
                        currentNode = this.head;
                    //判断从哪个指针开始搜索更优
                    if(pos >= this.length/2){
                        [after,before] = [before,after];
                        currentNode = this.foot;
                        pos = this.length - pos;
                    } 
                    for(let i = 0;i < pos - 1;i++){
                        currentNode = currentNode[after];
                    }

                    element[after] = currentNode[after];
                    element[before] = currentNode;
                    currentNode[after][before] = element;
                    currentNode[after] = element;

                }
                

            }
            this.length++;
            return true;
        }

    }
    //同insert功能相同，但性能较低，且可读性差(合并了传入合法范围后length≠0的情况)
    insert_ipe(pos,elem){

        if(pos < 0 || pos > this.length){

            return false;

        } else {

            let element = new Node(elem);

            if(this.length === 0){

                this.head = this.foot = element;

            } else {

               let currentPoint = "head",
                    after = "next",
                    before = "prev";

                //根据pos位置判断从哪头开始查询最优
                if(pos >= this.length / 2){

                    currentPoint = "foot";
                    [after,before] = [before,after];
                    pos = this.length - pos;

                }
                let currentNode = this[currentPoint];

                for(let i = 0;i < pos;i++){
                    currentNode = currentNode[after];
                }
                //若插入位置的节点为链表末端节点，则修改对应的指针（head or foot）
                if(currentNode[before] === null){

                    currentNode[before] = element;
                    element[after] = currentNode;
                    this[currentPoint] = element;
                
                //否则正常插入
                } else {

                    element[after] = currentNode;
                    element[before] = currentNode[before];
                    currentNode[before] = currentNode[before][after] = element;

                }
                

            }
            this.length++;
            return true;
        }
    }
    removeAt(pos){
        //删除位置在范围之外（可在0和length-1即末尾删除）
        if(pos < 0 || pos >= this.length){

            return false;

        } else {
            //链表长度为1时需要调整2个指针
            if(this.length === 1){

                this.head = this.foot = null;

            } else {
                //链表长度不为1
                //删除位置在首位
                if(pos === 0){

                    this.head = this.head.next;
                    this.head.prev = null;
                //删除位置在末尾
                } else if(pos === this.length - 1){

                    this.foot = this.foot.prev;
                    this.foot.next = null;
                //删除位置在中间
                } else {

                    let currentNode = this.head,
                        hand = "next";

                    if(pos >= this.length / 2){

                        pos = this.length - 1 - pos;
                        currentNode = this.foot;
                        hand = "prev";

                    }
                    for(let i = 0;i < pos ;i++){

                        currentNode = currentNode[hand];

                    }

                    currentNode.next.prev = currentNode.prev;
                    currentNode.prev.next = currentNode.next;

                }

            }
            this.length--;
            return true;
        }
    }
    //性能要低于removeAt且可读性也比较低（同removeAt原理相同）
    removeAt_ipe(pos){

        if(pos < 0 || pos >= this.length){

            return false;

        } else {

            if(this.length === 1){

                this.head = this.foot = null;

            } else {

                let currentPoint = "head",
                after = "next",
                before = "prev";

                if(pos >= this.length / 2){

                    currentPoint = "foot";
                    [after,before] = [before,after];
                    pos = this.length - 1 - pos;

                }

                let currentNode = this[currentPoint];

                for(let i = 0;i < pos;i++){

                    currentNode = currentNode[after];

                }
                if(currentNode[before] === null){

                    this[currentPoint] = currentNode[after];
                    currentNode[after][before] = null;

                } else {

                    currentNode[before][after] = currentNode[after];
                    currentNode[after][before] = currentNode[before]
                }

            }
            this.length--;
            return true;
        }
    }

}