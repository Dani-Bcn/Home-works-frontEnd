import React from 'react';

const Help = () => {
    return (
      <div>
            <h1>This application has two sections, one that belongs to the parents and the other that belongs to the children.     </h1>             
            <h1>Parent's section</h1>
            <h2>            
                In the parents section we can add a child, once we have the children that we have decided, we can access their information and edit this child    
                Within the child's information we can add tasks, tasks will be added for one day.
                Once the day is over we must restart the points, the tasks will also be restarted, in order to add new tasks for the next day.     
    
            </h2>
            <h1>Child's section</h1>
            <h2>
                This section is where the children will work, here they will see the tasks they must do and once a task is completed they must click on it to finish this task.
                They will also have the rewards tab to be able to see the rewards, the rewards, the points and cups          
            </h2>
            <h1>Points and rewards </h1>
            <h2>               
                In the rewards tab we can see the points, rewards and cups won so far.
                The points will be equivalent to minutes of leisure
                Each time the child completes a task, the points for that task will be added.
                The points will be added throughout the month to get cups
                for every 500 points you will win a cup
                At the end of the month they will obtain the rewards based on the total number of cups obtained
            </h2>
        </div>
    );
}
export default Help;
