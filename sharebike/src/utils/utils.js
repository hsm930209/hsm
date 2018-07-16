import React from 'react';
import { Select} from 'antd'
const Option = Select.Option;
export default {
    formateDate(time){
        if(!time)return '';
        let date = new Date(time);
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
    },

    pagination(data,callback){
        return {
            onChange:(current)=>{
                callback(current);
            },
            current:data.result.page,
            pageSize:data.result.page_size,
            total:data.result.total,
            showTotal:()=>{
                return `共有${data.result.total}条数据`
            },
            showQuickJumper:true,
        }

    }
   
}