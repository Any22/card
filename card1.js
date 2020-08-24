    class Card {
        constructor(id,cname,pic,description,assignee,dDate,st)
        {
        this.id = id ;
        this.cname  = cname ;
        this.pic  = pic   ;
        this.description=description;
        this.assignee = assignee;
        this.dDate=dDate;
        this.st=st;
       
        }
        htmlString() {
            let html="";
                    html = `<div id ="cList_${this.id}" class="card">
                            <h1>${this.cname}</h1>
                            <img src="sample.jpg" alt="Denim Jeans" style="width:100%">
                            <p>${this.description}</p>
                            <p>${this.assignee}</p>
                            <p>${this.dDate}</p>
                            <p>${this.st}</p>
                            <p>${this.id}</p>
                            <p><button class="delete btn btn-primary" id="dbutton_${this.id}"> Delete</button></p>
                            <p><button class="Edit btn btn-primary" id="ebutton_${this.id}"> Edit</button></p>
                            </div>`;  
                          return html;
         }
         toElement() {
            const htmlElement = this.htmlString(); //assigning function to var
            const element = document.createRange().createContextualFragment(htmlElement);
            element.querySelector("button.Edit").addEventListener("click", edifunc);
            element.querySelector("button.delete").addEventListener("click", delfunc);
            return element;
        }

    }
    class CardManager{
        constructor(master) {
        this.cardArr=[];
        this.currentId = 1;
        this.master =master;
        }
            addcard(cname,pic,description,assignee,dDate,st){
                    let nCard=new Card(`nCard${this.currentId++}`,cname,pic,description,assignee,dDate,st);//creates an instance of class card
                    this.cardArr.push(nCard);
                }

            updateTask(id,cname,pic,description,assignee,dDate,st) {                  //Function to update TASK
                    alert("I am in update function");
                    // alert(id);
                    for (let i=0; i<this.cardArr.length;i++) {
                        
                        if(this.cardArr[i].id == id) {
                        // alert(" im in update condition");
                        this.cardArr[i].cname = cname;
                        this.cardArr[i].description = description;
                        this.cardArr[i].assignee = assignee; 
                        this.cardArr[i].dDate = dDate;
                        
                        this.cardArr[i].st = st;
                        break;
                        }
                        }
                    }
            deletFunc(id)
            {
                    for (let i=0 ; i<this.cardArr.length; i++)
                        {
                            if (this.cardArr[i].id == id ){
                            alert ("in delete" + i +" "+ this.cardArr[i].cname);
                            this.cardArr.splice(i,1);                               //An array (Array) containing the deleted elements.
                            break;
                            }
                        }
            
            }                     
            displayListHtml(){
                  
                    alert("I am in display");
                    this.master.innerHTML ="";
                    let cardhtml;
                    this.cardArr.forEach((nCard) => {
                    let taskElement = nCard.toElement();
                    this.master.append(taskElement);
                
                      });
                    }
                    
    }                                             
                
                
        
        let taskcontainer = document.querySelector("#taskcontainer"); 
        const cardDeck=new CardManager(taskcontainer);                 //create an instance of card manager to access the members
         
        //adding tasks
      
        let addButton=document.querySelector("#addButton");
        addButton.onclick= function(){
        // alert("here i am card deck");
        let tname    = document.querySelector("#text1");                //accepting user input from form
        let tdes     = document.querySelector("#des");   
        let assignee = document.querySelector("#assignee");
        let dDate = document.querySelector("#dDate");
        let sTatus = document.querySelector("#stAtus");

               
        // cardDeck.addcard("laundry","test","testing","Saeed","thursday","to do");
        cardDeck.addcard(tname.value,"test",tdes.value,assignee.value,dDate.value,sTatus.value);
        cardDeck.displayListHtml();
        $('#myModal').modal('hide');
             resetFields();
        }
        
         
    function resetFields(){
        
        tname.value     = null;
        desc.value      = null;
        dueDate.value   = null;
        assign.value    = null;
        status.value    = null;
    }


        function edifunc(){
            alert("i am in editfun");
            let taskElement = event.target.closest(".Edit");                       
            let edtIdArr = taskElement.id.split("_");                               //spliting the id by underscore. i.e . dbuton_id 
            let retreiveId = edtIdArr[1];
            alert(retreiveId);
            
            for (let i=0; i<cardDeck.cardArr.length ; i++){
                if (retreiveId == cardDeck.cardArr[i].id) {
                document.querySelector("#tId").value    =cardDeck.cardArr[i].id;
                document.querySelector("#ename").value    = cardDeck.cardArr[i].cname ; 
                document.querySelector("#edes").value      = cardDeck.cardArr[i].description;  
                document.querySelector("#eAssignee").value = cardDeck.cardArr[i].assignee;  
                document.querySelector("#edDate").value   = cardDeck.cardArr[i].dDate;  
                document.querySelector("#estAtus").value  = cardDeck.cardArr[i].st;  
                break;
                }    
            }
            $('#ediTModal').modal('show');
        }
        
        let upDateButton = document.querySelector("#upDateButton");
        
        upDateButton.onclick = function() {
         
         let tempId = document.querySelector("#tId").value; 
        
         let tempname = document.querySelector("#ename").value; //accepting user input from form
         let tempdesc = document.querySelector("#edes").value;   
         let tempassign = document.querySelector("#eAssignee").value; 
         let tempdueDate = document.querySelector("#edDate").value;
         let tempstatus = document.querySelector("#estAtus").value;
         
        
         cardDeck.updateTask(tempId, tempname,"test" ,tempdesc, tempassign, tempdueDate, tempstatus);
         cardDeck.displayListHtml();
        
         $('#ediTModal').modal('hide');
      }
    
    
       function delfunc(){
         alert("i am in delete function");
        let taskElement = event.target.closest(".delete");                      //see line 74.
        let delIdArr = taskElement.id.split("_");                               //spliting the id by underscore. i.e . dbuton_id 
        let retreiveId = delIdArr[1];
        alert(retreiveId);
        cardDeck.deletFunc(retreiveId);
        cardDeck.displayListHtml();
        }
    
    


    
    
        


       
        

