<script>
    import {onMount, setContext} from 'svelte'
    import {authRepository} from '..'

    setContext('auth',{
        getRepository:()=> authRepository
    })


    onMount(()=>{})
</script>

<div>

</div>