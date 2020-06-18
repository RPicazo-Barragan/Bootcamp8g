var kodersToAdd = []
/*[
    {
        koderKey:"asdf",
        name:"asdaaaa",
        age:30
    }
]*/
var kodersToDelete = []
/*[
    "asdf",
    "bacadada"
]
*/
const loadContent = (contentUrl,callback) =>{
    $("#content-wrapper").load(contentUrl,callback)
}

const getFormData = () => {
    let koderObject = {}
    $('input').each(function (index) {
        let objectKey = $(this).data("points-to");
        let value = $(this).val();
        koderObject[objectKey] = value;
    })
    kodersToAdd.push(koderObject)
    console.log(koderObject)
    console.log(kodersToAdd)
    printTableRows(kodersToAdd)
}
const printTableRows = (dataToPrint) => {
    $("post-wrapper").empty();
    dataToPrint.forEach( koder => {
        let { name, lastName, age, bio } = koder
        let picId = Math.floor(Math.random() * (255 - 1) + 1)
        $("#post-wrapper").append( `
        <div class="card mb-3 m-4" style="max-width: 540px;">
         <div class="row no-gutters">
         <div class="col-md-4">
         <img src="https://picsum.photos/id/${picId}/200/200?random-1" class="card-img" alt="...">
       </div>
       <div class="col-md-8">
         <div class="card-body">
           <h4 class="card-title">${name}</h5>
           <h5 class="card-title">${lastName}</h4>
           <p class="card-text">${age}</p>
           <p class="card-text">${bio}</p>
           <p class="card-text"><small class="text-muted"></small></p>
         </div>
       </div>
     </div>
   </div>
        `)
    })
    $(".delete").click(deleteTableRow)
}
const saveKoder = ( koderObject ) => {
    let url = "";
    let method = "";
    koderObject.key 
    ? (
        url = `https://ajaxclass-1ca34.firebaseio.com/equipo4/koders/${koderObject.key}.json`,
        method = "PATCH"
    )       
    : (
        url = `https://ajaxclass-1ca34.firebaseio.com/equipo4/koders/.json`,
        method = "POST"
    )
    $.ajax({
        url: url,
        method:method,
        data: JSON.stringify(koderObject),
        success: (response)=> {
            console.log(response);
        }
    });
}
const getKodersFromDb = () => {
    $.get("https://ajaxclass-1ca34.firebaseio.com/equipo4/koders/.json", 
    function( response ) {
        $.each( response, (key, value) => {
            console.log('key ', key)
            console.log('value ', value)
            kodersToAdd.push({...value, key});
            let { name, lastName, age, bio } = value
            let picId = Math.floor(Math.random() * (255 - 1) + 1)
            $("#post-wrapper").append(
            `
     <div class="card mb-3 m-4" style="max-width: 540px;">
      <div class="row no-gutters">
      <div class="col-md-4">
      <img src="https://picsum.photos/id/${picId}/200/200?random-1" class="card-img" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h4 class="card-title">${name}</h5>
        <h5 class="card-title">${lastName}</h4>
        <p class="card-text">${age}</p>
        <p class="card-text">${bio}</p>
        <p class="card-text"><small class="text-muted"></small></p>
      </div>
    </div>
  </div>
</div>
     `)
        })
        $(".delete").click(deleteTableRow)
    });
}

const deleteTableRow = (event) => {
    let selectedRow = $(event.target);
    let koderKey = $(event.target).closest("tr").data('koder-key');
    koderKey ? kodersToDelete.push(koderKey) : null;
    console.log(kodersToDelete)
    let koderIndex = kodersToAdd.findIndex( (koder) => koder.key === koderKey) ;
    console.log(koderIndex)
    kodersToAdd.splice(koderIndex, 1)
    console.log(kodersToAdd)
    $(event.target).closest("tr").remove();
}
const deleteKoder = ( koderKey ) => {
    $.ajax({
        url: `https://ajaxclass-1ca34.firebaseio.com/equipo4/koders/${koderKey}.json`,
        method:'DELETE',
        success: (response)=> {
            console.log(response);
        }
    });
}
$("#saveData").click( () => {
    kodersToAdd.forEach( koder => {
        saveKoder( koder )
    })
    kodersToDelete.forEach( koder => {
        deleteKoder( koder )
    })
})
$("#submit").click(getFormData)
getKodersFromDb()