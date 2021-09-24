<script>
    import marked from 'marked';
    export let markdown = '';
    let result = '';
    $: {
        if(markdown) {
            console.log('reactive: markdown: ',markdown);
            result = marked(markdown);
            console.log('reactive: result: ',result);
        }
    }

</script>
<style lang="scss">
	
    .markdown-editor__result-html{
        border: 1px solid black;
        padding: 20px;
    }
	
    
</style>


        <div class="title">תצוגת תיאור:</div>
		<div class="markdown-editor__result-html">
			{@html result}
		</div>



