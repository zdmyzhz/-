//优先队列对象
class PriorityQueue {
    constructor(){
        this.item = [];
        this.observer = [];
    }
    //进队_他人
    enqueue_o(name,priority){

        let queueElement = {
            name,
            priority
        };
        let added = false;

        if(this.isEmpty()){

            this.item.push(queueElement);

        } else {

            for(let i = 0,len = this.size(); i < len; i++){

                if(priority < this.item[i].priority){

                    this.item.splice(i,0,queueElement);
                    added = true;
                    break;
                }
            }
        }
        if(!added){
            this.item.push(queueElement);
        }

    }
    //进队_我（只有在数组很大且有多个重复值时时间复杂度才优于第一种进队方式）
    enqueue_m(name,priority){

        let queueElement = {
            name,
            priority
        };
        if(this.observer.length === 0){
            this.observer.push({
                priority,
                index:0
            });
            this.item.push(queueElement);
        } else {
            let added = false;
            for(let i = 0; i < this.observer.length;i++){
                if(!added){
                    if(priority < this.observer[i].priority){
                        if( i > 0 && priority === this.observer[i-1].priority){
                            this.observer[i-1].index++;
                            i--;
                        } else {
                            this.observer.splice(i,0,{
                                priority,
                                index:i ? this.observer[i-1].index + 1 : 0
                            });
                        }
                        this.item.splice(this.observer[i].index,0,queueElement);
                        added = true;
                    }
                } else {
                    this.observer[i].index++;
                }
            }
            if(!added){
                if(priority > this.observer[this.observer.length-1].priority){
                    this.observer.push({
                        priority,
                        index:this.item.length
                    });
                } else {
                    this.observer[this.observer.length-1].index++;
                }
                this.item.push(queueElement);
            }
        }
    }
    //出队
    dequeue(){
        return this.item.shift();
    }
    front(){
        return this.item[0] || null;
    }
    clear(){
        this.item.length=0;
        this.observer.length=0;
        return true;
    }
    isEmpty(){
        return this.item.length === 0;
    }
    size(){
        return this.item.length;
    }
    print(){
        let strArr = [];

        strArr = this.item.map((item) => `${item.name} => ${item.priority}`);

        console.log(strArr.toString());
    }
}
