<svelte:options tag="svelte-custom-element" />

<script>
  import MarkdownEditor from './components/MarkdownEditor.svelte'
	import {catalogImageData, sizesApiData, colorsApiData} from './store/store';
	import { onMount } from "svelte";
	import {ENDPOINT_API} from './utils/consts';
	//import MarkdownEditor from './components/MarkdownEditor.svelte';
//	import MultiSelect from './components/MultiSelect.svelte';
  import SvelteSelect from 'svelte-select';

	export let catalog_image_id = '77';


	function price_diff_calc(v1, v2) {
		console.log('price_diff_calc ececuted: v1: ', v1,' v2: ',  v2);
		if (v1 && v2) {
			let prcent = ((v1/v2 ) - 1.0)*100.0
			return parseFloat(prcent).toFixed( 2 );
			//return prcent
		}else {
			return ''
		}
	}
	let value = undefined;
	onMount(()=>{
		let catalogImageUrl = ENDPOINT_API + 'svelte/api/products/' + catalog_image_id + '/';

		console.log('feching data from url: ', catalogImageUrl)
		fetch(catalogImageUrl)
			.then(response => response.json())
			.then(result => {
				console.log('got data from url ',catalogImageUrl , ' result: ', result);
        for(let i = 0; i < result.sizes.length; i++) {
          result.sizes[i] = '' + result.sizes[i];
        }
        for(let i = 0; i < result.colors.length; i++) {
          result.colors[i] = '' + result.colors[i];
        }
				catalogImageData.set(result);
			})
			.catch(error => console.log('error', error));


      updateSizesApi();
      updateColorsApi();
	});
  function updateColorsApi() {
    let colorsApiUrl =  ENDPOINT_API + 'svelte/api/colors/';

    fetch(colorsApiUrl)
			.then(response => response.json())
			.then(result => {
				console.log('got data from url ',colorsApiUrl , ' result: ', result);
				colorsApiData.set(result);
			})
			.catch(error => console.log('error', error));
    
  }
  function updateSizesApi() {
    let sizesApiUrl =  ENDPOINT_API + 'svelte/api/sizes/';

    fetch(sizesApiUrl)
			.then(response => response.json())
			.then(result => {
				console.log('got data from url ',sizesApiUrl , ' result: ', result);
				sizesApiData.set(result);
			})
			.catch(error => console.log('error', error));
      
  }
	
	$: first_profit = price_diff_calc($catalogImageData.client_price, $catalogImageData.cost_price);
	$: secound_profit = price_diff_calc($catalogImageData.recomended_price, $catalogImageData.client_price);
	
	
	
	

</script>

<main>
	<h2>מספר סידורי: {catalog_image_id}</h2>
	<p>{$catalogImageData.title}</p>
	<form action="POST">
		<div class="form-group">
			<label for="title">כותרת: </label>
			<input type="text" bind:value="{$catalogImageData.title}" name="title"/>
		</div>
		<div class="form-group">
			<label for="description" >תיאור: </label>
			<div class="markdown">
				<textarea rows="10" cols="50" bind:value={$catalogImageData.description}/>
				<MarkdownEditor markdown={$catalogImageData.description}/>
			</div>
		</div>
		<div class="form-group">
			<label for="barcode">ברקוד: </label>
			<input type="text" bind:value="{$catalogImageData.barcode}" name="barcode"/>
		</div>
		<div class="form-group">
			<label for="can_tag">ניתן למיתוג: </label>
			<input type="checkbox" bind:value="{$catalogImageData.can_tag}" name="can_tag"/>
		</div>
		<div class="form-group">
			<div class="prices">
				<label for="cost_price">מחיר עלות: </label>
				<input type="number" bind:value="{$catalogImageData.cost_price}" name="cost_price">
				<label for="cost_price">מחיר מחירה: </label>
				<input type="number" bind:value="{$catalogImageData.client_price}" name="client_price">
				<div class="calc" class:red={first_profit<=0}>({first_profit}%)</div>
				<label for="cost_price">מחיר מומלץ: </label>
				<input type="number" bind:value="{$catalogImageData.recomended_price}" name="recomended_price">
				<div class="calc" class:red={secound_profit<=0}>({secound_profit}%)</div>
			</div>
		</div>
		<div class="form-group">
      <label for="sizes">מידות: </label>
			<SvelteSelect name="sizes" items={$sizesApiData} isMulti={true} bind:value="{$catalogImageData.sizes}">
			</SvelteSelect>
		</div>
    <div class="form-group">
      <label for="sizes">צבעים: </label>
			<SvelteSelect name="sizes" items={$colorsApiData} isMulti={true} bind:value="{$catalogImageData.colors}">
			</SvelteSelect>
		</div>
		<img src="{$catalogImageData.image}" alt="${catalogImageData.title}"/>
	</form>
</main>

<style lang="scss">
	.markdown {
		display:flex;
		flex-direction: row;
	}
	.prices {
		display:flex;
		.calc {
			padding-right: 10px;
			color:green;
			&.red {
				color:red;
			}
		}
	}
	main {
		direction: rtl;
		padding-top:150px;
		width:80%;
		margin:auto;
		form {
			.form-group {
				padding-top: 25px;
				padding-bottom: 25px;
				display:flex;
				justify-content: start;
				align-items: center;
				label {
					padding-left: 50px;
					padding-right: 25px;
				}
				border-bottom: 1px solid black;
			}
		}
	}



</style>


