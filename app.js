
const url="https://hexschool.github.io/js-filter-data/data.json";
let data=[];
let type="";

const productsList=
document.querySelector(".showList");
const buttonGroup=
document.querySelector(".button-group");
const crop=
document.querySelector("#crop");

const search=
document.querySelector(".search");
const showResult=
document.querySelector(".show-result");
const select=
document.querySelector(".sort-select");
const mobSelect=
document.querySelector(".mobile-select");
const sortSelect=
document.querySelector(".sort-select");
const sortAdvanced =
document.querySelector(".js-sort-advanced");

//透過axios.get撈取url資料
function getData(){
  axios.get(url)
  .then(function(response){
    data=response.data;
    renderData(data);
  }) 
  .catch(function(error){
    console.log(error);
}) 
};
getData();

//資料初始化
function renderData(showData){
   let str="";
   showResult.textContent=type===
   'search' ? `查看「${crop.value.trim()}」的比價結果`:'';

   showData.forEach((item)=>{
    str +=`<tr>
    <td>${item.作物名稱}</td>
    <td>${item.市場名稱}</td>
    <td>${item.上價}</td>
    <td>${item.中價}</td>
    <td>${item.下價}</td>
    <td>${item.平均價}</td>
    <td>${item.交易量}</td>
    </tr>`;
   });
productsList.innerHTML=str;
};

//監聽按鈕點擊事件
buttonGroup.addEventListener("click",changeTab);

function changeTab(e){
    if(e.target.nodeName !=="BUTTON"){
        return;
    }
    const tabs=
    document.querySelectorAll(".button-group button");
    tabs.forEach(item=>item.classList.remove("active"));

    let type=e.target.dataset.type;
    let filterData=[];
    if (type === "N04"){
        filterData=data.filter(item=>item.種類代碼==="N04");
        e.target.classList.add("active");
    }else if(type ==="N05"){
    filterData=data.filter(item=>item.種類代碼==="N05");
    e.target.classList.add("active");
    }else if(type ==="N06"){
        filterData = data.filter(item=>item.種類代碼 ==="N06");
        e.target.classList.add("active");
    }
    renderData(filterData);
}

//監聽搜尋點擊事件
search.addEventListener("click",searchData);

function searchData(){
    if(crop.value.trim()===""){
        alert("請輸入作物名稱!");
        return;
    }
    let filterData=[];
    filterData=data.filter((item)=>{
    if(item.作物名稱!==null){
        return item.作物名稱.match(crop.value);
    }
    });
    if(filterData.length===0){
        productsList.innerHTML='<tr><td colspan="6" class="text-center p-3">查詢不到交易資訊QQ</td></tr>'
        }else{
            renderData(filterData);
            crop.value="";
        }}

    //重複選單
    function resetSelect(){
        sortSelect.value=0;
        mobSelect.value=0;
    }   
    
    //監聽篩選排序資料
    select.addEventListener("change",(e)=>{
        switch(e.target.value){
         case"依上價排序":
         selectChange("上價");
         break;
         case "依中價排序":
            selectChange("中價");
            break;
        case "依下價排序":
          selectChange("下價");
          break;
        case "依平均價排序":
            selectChange("平均價");
            break;
            case "依交易量排序":
            selectChange("交易量");
            break;
            default:       
        }
    });
    mobSelect.addEventListener("change",(e)=>
    {
      switch(e.target.value){
        case"依上價排序":
        selectChange("上價");
        break;
        case"依中價排序":
    selectChange("中價");
    break;
    case"依下價排序":
    selectChange("下價");
    break;
    case"依平均價排序":
    selectChange("平均價");
    break;
    case "依交易量排序":
     selectChange("交易量");     
    break;
    default:
    }
});

function selectChange(value){
    data.sort((a,b)=>{
        return b[value]-a[value];
    });
    renderData(data)
}
//監聽種類進階排序資料
sortAdvanced.addEventListener("click",(e)=>
{
    if(e.target.nodeName ==="I"){
    resetSelect();
    let sortPrice =
    e.target.dataset.price;
    let sortCaret =e.target.dataset.sort;
    if(sortCaret === "up"){
     data.sort((a,b)=>{
       return b[sortPrice]-a[sortPrice];//大排到小 
     });  
    } else{
      data.sort((a,b)=>{
        return a[sortPrice]-b[sortPrice];//小排到大
      });  
    }
renderData(data);
}
});
//監聽 鍵盤Enter
crop.addEventListener("keyup",(e)=>{
    if(e.key === "Enter"||e.keycode ===13){
        searchData();
    }
});

