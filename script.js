
   
        document.addEventListener("DOMContentLoaded", () => {
          const spacecraftTable  = document.querySelector('#spacecraftTable tbody'); 
          const prevBtn = document.getElementById('prevBtn');
          const nextBtn = document.getElementById('nextBtn');
          const rowPerPage = 10;
          let currentpage = 1;
          let Spacecraft= [];
          function fetchSpacecraft(){
          fetch('https://isro.vercel.app/api/spacecrafts')
           .then(response => response.json())
           .then(data =>{
                
            Spacecraft =data.spacecrafts;
            console.log(Spacecraft);
                  displayPage(currentpage);})
                  .catch(error => console.error('Error fetching data:', error));
           }
                  
                          
                function displayPage(page){
                  spacecraftTable.innerHTML ="";
                  const start = (page-1)* rowPerPage;
                  const end = start + rowPerPage;
                  const paginatedSpacecrafts = Spacecraft.slice(start,end);
                
                  paginatedSpacecrafts.forEach(spacecraft=>{

                    const row =document.createElement('tr');
                    const idcell =document.createElement("td");
                    idcell.textContent =spacecraft.id;
                    row.appendChild(idcell);
                    const namecell =document.createElement("td");
                   namecell.textContent =spacecraft.name;
                   row.appendChild(namecell);
                   spacecraftTable.appendChild(row)
                  });
                  updatepaginationControls()
                };
                 function updatepaginationControls(){
                  prevBtn.disabled = currentpage=== 1;
                  nextBtn.disabled = currentpage * rowPerPage >=Spacecraft.length;
                  }
                  prevBtn.addEventListener('click',()=>{
                    if(currentpage >1){
                      currentpage--;
                      displayPage(currentpage);
                    }
                  });
                  nextBtn.addEventListener('click',()=>{
                    if (currentpage * rowPerPage <Spacecraft.length){
                      currentpage++;
                      displayPage(currentpage);
                    }
                  });
                  fetchSpacecraft()
                });
                
               
   