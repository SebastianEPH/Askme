console.log('si entró el script wey ')



function select_time_init_f(){
    let $select_time_init = document.getElementById('select_time_init')
    if ($select_time_init.value === '1'){   // No
        document.getElementById('time_init').style.display = 'block'
    } else if ($select_time_init.value === '0'){
        document.getElementById('time_init').style.display = 'none'
    }
}
function select_time_finish_f(){
    let $select_time_finish = document.getElementById('select_time_finish')
    if ($select_time_finish.value === '1'){   // No
        document.getElementById('time_finish').style.display = 'block'
    } else if ($select_time_finish.value === '0'){
        document.getElementById('time_finish').style.display = 'none'
    }
}
function time_limit_f() {
    let $select_time_limit = document.getElementById('select_time_limit')
    if ($select_time_limit.value === '0'){   // No
        document.getElementById('time_limit').style.display = 'block'
    } else if ($select_time_limit.value === '1'){
        document.getElementById('time_limit').style.display = 'none'
    }
}







time_limit_f()
select_time_finish_f()
select_time_init_f()