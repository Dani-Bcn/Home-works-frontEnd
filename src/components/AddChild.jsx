import React from 'react';
const AddChild = () => {
    const handleSumit=((e)=>{
        e.preventDefault()
        console.log(e.target.value)
    })
    return (
        <div>
            <form action="" onSubmit={handleSumit}>
                <input type="text" name="name" id="" placeholder='Name'></input>
                <input type="text" name="yearOfBirth" id="" placeholder='Year of birth'></input>
                <input type="text" name="" id="" placeholder='Name'></input>
                <button type='submit'>Add child</button>
            </form>
        </div>
    );
}
export default AddChild;
