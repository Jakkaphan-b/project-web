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
      const response = await axios.get(`${BASE_URL}/pms/${id}`)
      const user = response.data

      let projectnameDOM = document.querySelector('input[name=projectname]')
      let lastNameDOM = document.querySelector('input[name=lastname]')
      let ageDOM = document.querySelector('input[name=age]')
      

      projectnameDOM.value = user.projectname
      lastNameDOM.value = user.lastname
      ageDOM.value = user.age
      

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
  if (!pmsdata.Cost_budget) {
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
    let lastNameDOM = document.querySelector('input[name=lastname]')
    let ageDOM = document.querySelector('input[name=age]')
    let genderDOM = document.querySelector('input[name=gender]:checked') || {}
    let interestDOMs = document.querySelectorAll('input[name=interest]:checked') || {}
   

    let messageDOM = document.getElementById('message')

    try {
      let interest = ''

      for (let i = 0; i < interestDOMs.length; i++) {
        interest += interestDOMs[i].value
        if (i != interestDOMs.length - 1) {
          interest += ', '
        }
      }
      console.log('test')
      let userData = {
        projectname: projectnameDOM.value,
        lastname: lastNameDOM.value,
        age: ageDOM.value,
        gender: genderDOM.value,
        
        interests: interest
      }
      console.log('submit data', userData)

      const errors = validateData(userData)

      if (errors.length > 0) {
        throw {
          message: 'กรอกข้อมูลไม่ครบ!',
          errors: errors
        }
      }

      let message = 'บันทึกข้อมูลสำเร็จ!'

      if(mode == 'CREATE'){
        const response = await axios.post(`${BASE_URL}/pms`, userData)
        console.log('response', response.data)
      } else {
        const response = await axios.put(`${BASE_URL}/pms/${selectedId}`, userData)
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
        htmlData += `<li>${error.errors[i]}</li>`
      }
      htmlData += '</ul>'
      htmlData += '<div>'


      messageDOM.innerHTML = htmlData
      messageDOM.className = 'message danger'
    }
  }