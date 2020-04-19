class Test{

    constructor(){

        this.paramStruct = {
            
            norParamType : [{type : "Num",followScale : true}]

        };
        this.defultMethod = {

            params : ["Num"],
            compareMethodObj : [
                // {
                //     class : LinkedList,
                //     method : "removeAt"
                // },
                {
                    class : LinkedList_doubly,
                    method : "removeAt"
                },
                {
                    class : LinkedList_doubly,
                    method : "removeAt_ipe"
                }
            ]
        };
        //数据规模默认配置
        //initDataScale 初始数据规模
        //sameScaleTestNum 相同规模测试次数
        //scaleIncreaseNum 规模递增次数
        //scaleIncreaseMulNum 规模递增倍数
        this.dataScale = {

            initDataScale : 1000000,
            sameScaleTestNum : 100,
            scaleIncreaseNum : 1,
            scaleIncreaseMulNum : 10

        };

    }
    randomNum(range = 10000,whole = true){

        return whole ? Math.floor(Math.random()*range) : Math.random()*range;
    }
    randomStr(){

        let code = Math.floor(Math.random()*Math.pow(2,16));
        return String.fromCodePoint(code);

    }
    randomBoole(){

        return !Math.floor(Math.random()*2);

    }
    //根据传入的数组筛选出数组中的 平均值(ave)、最大值(max)和最小值(min)
    dataSelect(numArry){

        let ave = numArry.reduce((pre,next) => pre + next) / numArry.length,
            min = Math.min.apply(Math,numArry),
            max = Math.max.apply(Math,numArry);

        return {
            min,
            max,
            ave
        };

    }
    //根据传入的二维数字类型数组求维度的最大、最小和平均值
    getScaleData(arryArry){

        let dataObj = null,
            dataBox = {
                min : [],
                max : [],
                ave : []
            };

        for(let arry of arryArry){

            dataObj = this.dataSelect(arry);

            dataBox.max.push(dataObj.max);
            dataBox.min.push(dataObj.min);
            dataBox.ave.push(dataObj.ave);
        }

        return dataBox;

    }
    compareTime(dataSize,
        {
            norParamType = this.paramStruct.norParamType
        } = this.paramStruct
    ,...fnUnit){

        let dataUnit = [],
            paramUnit = [],
            execFn = [],
            fn = null;

        //创建运行随机函数数组
        for(let i of norParamType){

            fn = "random" + i.type;
            fn = this[fn] ? fn : "randomNum";
            execFn.push(fn);

        }

        //生成测试数据
        for(let i = 0;i < dataSize;i++){

            paramUnit = [];

            for(let l of execFn){

                paramUnit.push(this[l]());
            }

            dataUnit.push(paramUnit);

        }

        let start = null,
            end = null,
            spend = [];
        //生成测试时间
        for(let fn of fnUnit){

            start = Date.now();

            for(let data of dataUnit){

                fn.apply(null,data);

            }

            end = Date.now();

            spend.push(end - start);
        }

        return spend;

    }
    //根据传入的数据规模对象(dataScale)和 要比较的数据结构方法对象(defultMethod)生成测试运行时长
    createExecData(
        {
            initDataScale = this.dataScale.initDataScale
            ,sameScaleTestNum = this.dataScale.sameScaleTestNum
            ,scaleIncreaseNum = this.dataScale.scaleIncreaseNum
            ,scaleIncreaseMulNum = this.dataScale.scaleIncreaseMulNum
        } = this.dataScale
        ,{
            params = this.defultMethod.params
            ,compareMethodObj = this.defultMethod.compareMethodObj
        } = this.defultMethod
    ){

        let radomMethod = [],
            fn = null;
        //初始化调用的随机函数数组
        for(let i of params){
            fn = "random" + i;
            radomMethod.push(this[fn] ? fn : "randomNum");
        }

        //实例化结构对象
        for(let i of compareMethodObj){
            i.instance = new i.class();
        }
        
        let currentScale = initDataScale,
            execTimeUnit = [],
            execTime = [],
            start = null,
            end = null,
            execParam = null,
            execParamUnit = [],
            midObj = null,
            execTimeObj = {
                min : [],
                max : [],
                ave : []
            };
        console.time("生成最终数据用时");
        for (let i = 0;i < scaleIncreaseNum; i++){

            execParamUnit.length = 0;
            execTimeUnit.length = 0;
            //生成测试数据
            for(let l =0;l < sameScaleTestNum; l++){

                execParam = [];

                for (let method of radomMethod){
                    execParam.push(this[method](currentScale,true));
                }

                execParamUnit.push(execParam);
            }
            console.time("生成单次规模数据用时");
            //相同测试数据不同函数运行时长测试
            for (let obj of compareMethodObj){

                execTime = [];
                for(let params of execParamUnit){

                    start = Date.now();
                    obj.instance.init(currentScale)[obj.method].apply(obj.instance,params);
                    end = Date.now();

                    execTime.push(end - start);

                }
                execTimeUnit.push(execTime);
                
            }
            console.timeEnd("生成单次规模数据用时");
            //各函数运行时长求值（最大、最小和平均）
            midObj = this.getScaleData(execTimeUnit);

            execTimeObj.max.push(midObj.max);
            execTimeObj.min.push(midObj.min);
            execTimeObj.ave.push(midObj.ave);

            currentScale *= scaleIncreaseMulNum;
        }
        console.timeEnd("生成最终数据用时");
        return execTimeObj;
    }
}

// let t = new Test();
// t.createExecData();