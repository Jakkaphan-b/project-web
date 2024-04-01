const express = require('express')
const bodyparser = require('body-parser')
const mysql = require('mysql2/promise')
const cors = require('cors')
const app = express()

app.use(bodyparser.json())
app.use(cors())

const port = 8000

let conn = null

const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'webdb',
    port: 8820
  })
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

// path = GET /pms สำหรับ get projects ทั้งหมดที่บันทึกเข้าไปออกมา
app.get('/project', async (req, res) => {
  const results = await conn.query('SELECT * FROM Project')
  res.json(results[0])
})

// path = POST /pms สำหรับการสร้าง projects ใหม่บันทึกเข้าไป
app.post('/project', async (req, res) => {
  try {
      let pmsdata = req.body
      const errors = validateData(pmsdata)
      if (errors.length > 0) {
        throw { 
          message: 'กรอกข้อมูลไม่ครบ',
          errors: errors }
      }
      const results = await conn.query('INSERT INTO Project SET ?', pmsdata)
      res.json({
        message: 'insert ok',
        data: results[0]
      })
  } catch (error) {
      const errorMessage = error.message || 'something wrong'
      const errors = error.errors || []
      console.error('error message', error.message)
      res.status(500).json({
        message: errorMessage,
        errors: errors
      })
  }
})

// GET /pms/:id สำหรับการดึง projects รายโครงการออกมา
app.get('/project/:id', async (req, res) => {
  try {
    let id = req.params.id
    const results = await conn.query('SELECT * FROM Project WHERE id = ?', id)

    if (results[0].length == 0) {
      throw { statusCode: 404, message: 'หาไม่เจอ' }
    }

    res.json(results[0][0])
  } catch (error) {
    console.error('error message', error.message)
    let statusCode = error.statusCode || 500
    res.status(statusCode).json({
      message: 'something wrong',
      errorMessage: error.message
    })
  }
})

// path = PUT /pms/:id สำหรับการแก้ไข projects รายโครงการ (ตาม id ที่บันทึกเข้าไป)
app.put('/project/:id', async (req, res) => {
  try {
    let id = req.params.id
    let updateProject = req.body
    const results = await conn.query(
      'UPDATE Project SET ? WHERE id = ?',
      [updateProject, id]
    )
    res.json({
      message: 'update ok',
      data: results[0]
    })
  } catch (error) {
    console.error('error message', error.message)
    res.status(500).json({
      message: 'something wrong'
    })
  }
})


// path DELETE /pms/:id สำหรับการลบ projects รายโครงการ (ตาม id ที่บันทึกเข้าไป)
app.delete('/project/:id', async (req, res) => {
  try {
    let id = req.params.id
    const results = await conn.query('DELETE from Project  WHERE id = ?', parseInt(id))
    res.json({
      message: 'delete ok',
      data: results[0]
    })
  } catch (error) {
    console.error('error message', error.message)
    res.status(500).json({
      message: 'something wrong'
    })
  }
})

app.listen(port, async (req, res) => {
  await initMySQL()
  console.log('http server run at ' + port)
})
