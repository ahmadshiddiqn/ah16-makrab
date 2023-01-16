<script lang="ts">
	import { onDestroy, onMount } from "svelte";
    import { enhance } from '$app/forms';
    import pb from "$db/pocketbase";
	import type { ActionData, PageData } from "./$types";
	import { type Topic, ETopic } from "$db/questions";

    export let data: PageData
    export let form: ActionData

    let filter: Topic
    let question: string
    let disabled = false
    let formEle: HTMLFormElement
    let descriptions = [
        "Pertanyaan tentang pribadi seseorang",
        "Pertanyaan tentang masa-masa muda. Bisa pas SMA, DKM, atau mungkin lebih muda lagi (KB, TK, SD, SMP), atau sedikit lebih tua (Kuliah)",
        "Pertanyaan yang berat, yang biasanya nyangkut ke adulting, atau pertanyaan-pertanyaan filosofis gitu",
        "Pertanyaan tentang romance~",
        "Pertanyaan mirip survei-survei, liat contoh di daftar pertanyaan",
        "Pertanyaan tentang hal yang disesali, bisa tentang hal2 yang sekiranya bisa dilakukan, dll. Tapi bukan 'What if'",
        "Pertanyaan 'What if'"
    ]
    $: ({questions} = data)
    $: shownQuestions = questions.filter(i => i.topic == filter)

    // onMount(async () => {
    //     filter = filter
    //     console.log(filter)
    // })

    $: {
        if (form?.fail) alert(form?.fail)
        if (form?.success) {
            fetch("?/reload").then().catch()
        }
    }


    onDestroy(() => {
        pb.authStore.clear()
    })
</script>
<div class="container-fluid" style="height: 100vh">
    <div class="row justify-content-center h-100">
        <div class="col-md-8 my-auto">
            <div class="card">
                <div class="card-header">
                    <h2 class="text-center">Daftar Pertanyaan Makrab AH16</h2>
                </div>
                <div class="card-body">
                    <h6>Topik Pertanyaan</h6>
                    <div class="mb-2">
                        <select class="form-select" bind:value={filter}>
                            <option value={ETopic.WhoAmI}>Who Am I?</option>
                            <option value={ETopic.WeWereYoung}>We Were Young</option>
                            <option value={ETopic.AdultingTogether}>Adulting Together</option>
                            <option value={ETopic.WhatIsLove}>What is Love?</option>
                            <option value={ETopic.WhosWho}>Who's Who?</option>
                            <option value={ETopic.IWishI}>I Wisht I...</option>
                            <option value={ETopic.WhatIf}>What if...?</option>
                        
                        </select>
                        <p><i class="fa-solid fa-circle-info me-1"></i>{descriptions[filter]}</p>
                    </div>
                    <h6>Daftar Pertanyaan</h6>
                    <ul class="list-group list-group-flush list-box mb-2">
                        {#each shownQuestions as question}
                        <li class="list-group-item">
                            {question.question}
                        </li>
                        {/each}
                    </ul>
                    <h6>Tambah Pertanyaan</h6>
                    <form 
                        bind:this={formEle}
                        method="post"
                        action="?/submit"
                        use:enhance={() => {
                            // prevent default callback from resetting the form
                            return ({ update, result }) => {
                                update({ reset: false });
                                if (result.type == "success") {
                                    question = ""
                                }
                                disabled = false
                            };
                        }}
                    
                    >
                        <input class="form-control mb-2" minlength="9" type="text" name="question" bind:value={question} required {disabled}>
                        <input class="d-none" name="topic" bind:value={filter}>
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-primary me-1" type="submit" on:click={() => {disabled = true; formEle.requestSubmit()}} {disabled}>Tambah</button>
                            <button class="btn btn-secondary" type="reset" {disabled}>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .list-box {
        border: 2px solid gainsboro;
        height: 250px;
        overflow: auto;
    }
</style>