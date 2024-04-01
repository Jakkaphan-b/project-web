const BASE_URL = 'http://localhost:8000'

let mode = 'CREATE'
let selectedId = '' //ตัวแปรแบบ Golbal ใช้ได้ทุกที่

window.onload = async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get('id')
  console.log('id', id)
  if (id) {
    mode = 'EDIT'
    selectedId = id

    try {
      const response = await axios.get(`${BASE_URL}/project/${id}`)
      const user = response.data

      let projectnameDOM = document.querySelector('input[name=projectname]')
      let detailDOM = document.querySelector('input[name=detail]')
      let responsibleDOM = document.querySelector('input[name=responsible]')
      let activityDOM = document.querySelector('input[name=activity]')
      let startDOM = document.querySelector('input[name=start]')
      let endDOM = document.querySelector('input[name=end]')
      let progressDOM = document.querySelector('input[name=progress]')
      let cost_budgetDOM = document.querySelector('input[name=cost_budget]')
      let financial_budgetDOM = document.querySelector('input[name=financial_budget]')
      let spendingDOM = document.querySelector('input[name=spending]')
      
      projectnameDOM.value = user.projectname
      detailDOM.value = user.detail
      responsibleDOM.value = user.responsible
      activityDOM.value = user.activity
      startDOM.value = user.start
      endDOM.value = user.end
      progressDOM.value = user.progress
      cost_budgetDOM.value = user.cost_budget
      financial_budgetDOM.value = user.financial_budget
      spendingDOM.value = user.spending
      

    } catch (error) {
      console.log('error', error)
    }
  }
}
const validateData = (pmsdata) => {
  let errors = []
  if (!pmsdata.projectname) {
    errors.push("ชื่อโครงการ")
  }
  if (!pmsdata.detail) {
    errors.push("รายละเอียด")
  }
  if (!pmsdata.responsible) {
    errors.push("ผู้รับผิดชอบ")
  }
  if (!pmsdata.activity) {
    errors.push("กิจกรรม")
  }
  if (!pmsdata.start) {
    errors.push("เวลาเริ่ม")
  }
  if (!pmsdata.end) {
    errors.push("เวลาจบ")
  }
  if (!pmsdata.progress) {
    errors.push("ความคืบหน้า")
  }
  if (!pmsdata.cost_budget) {
    errors.push("งบประมาณต้นทุน")
  }
  if (!pmsdata.financial_budget) {
    errors.push("งบประมาณการเงิน")
  }
  if (!pmsdata.spending) {
    errors.push("รายงานการใช้จ่าย")
  }
  return errors
}
  const submitData = async () => {
    let projectnameDOM = document.querySelector('input[name=projectname]')
    let detailDOM = document.querySelector('input[name=detail]')
    let responsibleDOM = document.querySelector('input[name=responsible]')
    let activityDOM = document.querySelector('input[name=activity]')
    let startDOM = document.querySelector('input[name=start]')
    let endDOM = document.querySelector('input[name=end]')
    let progressDOM = document.querySelector('input[name=progress]')
    let cost_budgetDOM = document.querySelector('input[name=cost_budget]')
    let financial_budgetDOM = document.querySelector('input[name=financial_budget]')
    let spendingDOM = document.querySelector('input[name=spending]')

    
   

    let messageDOM = document.getElementById('message')

    try {
      

      
      console.log('test')
      let pmsdata = {
        projectname: projectnameDOM.value,
        detail: detailDOM.value,
        responsible: responsibleDOM.value,
        activity: activityDOM.value,
        start: startDOM.value,
        end: endDOM.value,
        progress: progressDOM.value,
        cost_budget: cost_budgetDOM.value,
        financial_budget: financial_budgetDOM.value,
        spending: spendingDOM.value,       
      }
      console.log('submit data', pmsdata)

      const errors = validateData(pmsdata)

      if (errors.length > 0) {
        throw {
          message: 'กรอกข้อมูลไม่ครบ!',
          errors: errors
        }
      }

      let message = 'บันทึกข้อมูลสำเร็จ!'

      if(mode == 'CREATE'){
        const response = await axios.post(`${BASE_URL}/project`, pmsdata)
        console.log('response', response.data)
      } else {
        const response = await axios.put(`${BASE_URL}/project/${selectedId}`,pmsdata)
        message = 'แก้ไขข้อมูลสำเร็จ!'
        console.log('response', response.data)
      }
      messageDOM.innerText = message
      messageDOM.className = 'message success'

    } catch (error) {
      console.log('error message', error.message)
      console.log('error', error.erros)
      if (error.response) {
        console.log(error.response)
        error.message = error.response.data.message
        error.errors = error.response.data.errors
      }

      let htmlData = '<div>'
      htmlData += `<div>${error.message}</div>`
      htmlData += '<ul>'
      for (let i = 0; i < error.errors.length; i++) {
        htmlData += `<li>${error.errors[i]}</li>`;
      }
      htmlData += '</ul>'
      htmlData += '<div>'


      messageDOM.innerHTML = htmlData
      messageDOM.className = 'message danger'
    }
  }