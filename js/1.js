
let offers = [
	{
		job: "Back-end development",
		price: 100000,
		company: "Yandex",
		location: "Moscow",
		descriprtion: "offer\'s descriprtion",
		logo_company: "yandex.png"
	},
	{
		job: "Web full-stack development",
		price: 70000,
		company: "Microsoft",
		location: "Nizny Novgorod",
		descriprtion: "offer\'s descriprtion",
		logo_company: "microsoft.png"
	},
	{
		job: "Full-stack development",
		price: 700000,
		company: "Microsoft",
		location: "Nizny Novgorod",
		descriprtion: "offer\'s descriprtion",
		logo_company: "microsoft.png"
	},
	{
		job: "Game full-stack development",
		price: 800000,
		company: "Microsoft",
		location: "Nizny Novgorod",
		descriprtion: "offer\'s descriprtion",
		logo_company: "microsoft.png"
	},
	{
		job: "Web Front-end development",
		price: 90000,
		company: "LinkTelecom",
		location: "Bor",
		descriprtion: "offer\'s descriprtion",
		logo_company: "linktelecom.png"
	},
	{
		job: "Mobile development",
		price: 150000,
		company: "MTS",
		location: "Bor",
		descriprtion: "offer\'s descriprtion",
		logo_company: "mts.png"
	},
	{
		job: "Java development",
		price: 150000,
		company: "Sber",
		location: "Nizny Novgorod",
		descriprtion: "offer\'s descriprtion",
		logo_company: "sber.png"
	} 
];


let setting = {
	offersLimitPage: 3,
	activePage: 1

}

















function renderOffers(offersParm = offers){
	let listOffers = document.querySelector(".list_offers");
	listOffers.innerHTML = "";
	let start_index;
	offersParm.forEach((offer, index)=>{
		if(setting.activePage == 1){
			start_index = 0;
		}
		else{
			start_index = (setting.activePage - 1) * setting.offersLimitPage;
		}
		if( (index >= start_index) && (index < (start_index + setting.offersLimitPage)) ){
			listOffers.innerHTML +=`<div class="offer">
										<img src="imges/${offer.logo_company}" alt="">
										<div class="offer_info">
											<p class="company">${offer.company}</p>
											<h3 >${offer.job}</h3>
											<span>${offer.price} RUB</span>
											<p class="desc">${offer.descriprtion}</p>
											<p class="location">${offer.location}</p>
										</div>
									</div>`
		}
	});
	renderPagination(offersParm);
	
}
function renderPagination(offer){
	let wrapPag = document.querySelector(".wrap_pagination");
	if(offer.length > setting.offersLimitPage){
		wrapPag.innerHTML="";
		wrapPag.innerHTML += `  <nav aria-label="Page navigation example">
								  	<ul class="pagination">
									    <li class="page-item">
										    <a class="page-link pre_page" href="#" aria-label="Previous">
										        <span aria-hidden="true">&laquo;</span>
										    </a>
									    </li>
									    ${rengerCounterPage()}
									    <li class="page-item">
									        <a class="page-link next_page" href="#" aria-label="Next">
									        	<span aria-hidden="true">&raquo;</span>
									        </a>
									    </li>
								    </ul>
								</nav>`;
	function rengerCounterPage(){
		let pagesStr = "";
		for(let i = 0; i < Math.ceil(offer.length / setting.offersLimitPage); i++){
			pagesStr += `<li class="page-item"> <a href="#2" class="page-link">${i+1}</a></li>`;
		}
		return pagesStr;
	}
	document.querySelectorAll(".pagination .page-link").forEach((el)=>{
		el.addEventListener('click', (evt)=>{
			evt.preventDefault();
			setting.activePage = evt.target.innerHTML;
			renderOffers(offer);
		});

	});

	}
	else{
		wrapPag.innerHTML="";
	}
}

function renderFilters(){
	let filters = document.querySelector(".filters");
	let htmlLocation = locationFilters();
	filters.innerHTML += htmlLocation;
	let locationE1 = document.querySelector(".location_filters");
	locationE1.addEventListener('input', (e)=>{
		if(e.target.value == "all" ){
			renderOffers();
		}
		else{
			let resultOffers = [];
			for(let offer of offers){
				if(offer.location == e.target.value){
					resultOffers.push(offer);
				}
			}
			renderOffers(resultOffers);
		}
	});

}

function locationFilters(){
	let locations = new Set();
	for(let offer of offers){
		locations.add(offer.location);
	}
	let optionsStr = "";
	for(let location of locations){
		optionsStr += `<option value="${location}">${location}</option>`;
	}
	return `<div class="location_filters">
		<select name="" id="">
			<option value="all">All city</option>
			${optionsStr}
		</select>`;
}





//Offers' slider function for buttons
(()=>{let prevEl = document.querySelector(".slider_nav .prev");
	renderOffersInSlider(offers);
	let nextEl = document.querySelector(".slider_nav .next");
	let sliderOffersList = document.querySelector(".slider .offer_list");
	let step_slider = 0;
	let offerEls = sliderOffersList.querySelectorAll(".offer");
	let countOffers = offerEls.length;
	let countOffersWindow = document.querySelector(".slider").clientHeight;
	//Timer for slider
	let timer = setInterval(()=>{
		if(step_slider == countOffers*(-100)+countOffersWindow){
			step_slider = 0;
			sliderOffersList.style.marginTop = step_slider + "px";
		}
		else{
			step_slider = step_slider - 100;
			sliderOffersList.style.marginTop = step_slider + "px";
		}
	}, 4000);

	//--------------
	nextEl.addEventListener('click', ()=>{
		if(step_slider > countOffers*(-100)+countOffersWindow){
			step_slider = step_slider - 100;
			sliderOffersList.style.marginTop = step_slider + "px";
		}
	});
	prevEl.addEventListener('click', ()=>{
		if(step_slider < 0){
			step_slider = step_slider + 100;
			sliderOffersList.style.marginTop = step_slider + "px";
		}
	});})();
	
function renderOffersInSlider(offers){
	let listOffersInSlider = document.querySelector(".slider .offer_list");
	listOffersInSlider.innerHTML = "";
	offers.forEach(offer=>{
		listOffersInSlider.innerHTML += `<div class="offer">
			<img src="imges/${offer.logo_company}" alt="">
			<div class="offer_info">
				<h3>${offer.job}</h3>
				<span>${offer.price} RUB</span>
				<p class="desc">${offer.descriprtion}</p>
			</div>
		</div>`;
	});

}





renderFilters();
renderOffers();
