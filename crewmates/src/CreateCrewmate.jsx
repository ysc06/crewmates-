// import 
import { supabase } from './client';
import { useState } from 'react';


// create a function (compoment)
function CreateCrewmate(){
    const [crewmate, setCrewmate] = useState({name:'', speed:'', color:''})
    const handleSubmit = async (e) => {
    e.preventDefault(); // 告诉浏览器不要执行这个事件（不要刷新整页）

    console.log("clicked handleSubmit, current crewmate:", crewmate);

    const { data, error } = await supabase
    .from("crewmates")
    .insert({
        name: crewmate.name,
        speed: crewmate.speed,
        color: crewmate.color,
    })
    .select();


    console.log("Insert result:", { data, error });

    if (error) {
        // 这里你就会看到「失败的真正原因」
        alert("插入失败：" + error.message);
    } else {
        alert("Create 成功！");
        // 可选：清空表单
        setCrewmate({ name: '', speed: '', color: '' });
    }
    };

    return (
        <div>
            <h1>Create a New Crewmate </h1>
            <form onSubmit={handleSubmit}>
                Name:
                <input //自闭和的标签。
                    type = "text" //probs 属性
                    value = {crewmate.name} //用户一旦触发onChange, setCrewmate()更新，React重新render一次。value成为了新的值。
                    onChange = {(e)=> 
                        setCrewmate({...crewmate, name: e.target.value,}) //复制原本的空值，然name被新的值覆盖了。
                    }
                />
                Speed:
                <input
                    type = "number"
                    value = {crewmate.speed}
                    onChange = {(e)=>
                        setCrewmate({...crewmate, speed: e.target.value}) //完全可以把这个函数写在return外，上面。
                    }
                />
                Color: 
                <input
                    type = "text"
                    value = {crewmate.color}
                    onChange = {(e)=> setCrewmate({...crewmate,color:e.target.value})
                    } 
                />
                <button type="submit"> Create </button>
            </form>
        </div>

    );
};




//export. First alphabet must be uppercase for components
export default CreateCrewmate;