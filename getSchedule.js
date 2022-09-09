require('dotenv').config()
const DistrictName = process.env.DISTRICTNAME
const State = process.env.STATE
const Username = process.env.USRNAME
const Password = process.env.PASSWORD

const InfiniteCampus = require('infinite-campus-api')
// log in                          District Name    State  Username  Password
const user = new InfiniteCampus(DistrictName, State, Username, Password)
var schedule = {}

const blocks = {
  'A1' : ['1','1'],
  'C1' : ['1','2'],
  'D1' : ['1','3'],
  'H1' : ['1','4'],
  'F1' : ['1','5'],

  'B1' : ['2','1'],
  'A2' : ['2','2'],
  'H2' : ['2','3'],
  'G1' : ['2','4'],
  'E1' : ['2','5'],

  'C2' : ['3','1'],
  'B2' : ['3','2'],
  'F2' : ['3','3'],
  'D2' : ['3','4'],
  'G2' : ['3','5'],

  'A3' : ['4','1'],
  'C3' : ['4','2'],
  'E2' : ['4','3'],
  'F3' : ['4','4'],
  'H3' : ['4','5'],

  'B3' : ['5','1'],
  'A4' : ['5','2'],
  'G3' : ['5','3'],
  'E3' : ['5','4'],
  'D3' : ['5','5'],

  'C4' : ['6','1'],
  'B4' : ['6','2'],
  'D4' : ['6','3'],
  'H4' : ['6','4'],
  'F4' : ['6','5'],

  'A5' : ['7','1'],
  'C5' : ['7','2'],
  'H5' : ['7','3'],
  'E4' : ['7','4'],
  'G4' : ['7','5'],

  'B5' : ['8','1'],
  'E5' : ['8','2'],
  'F5' : ['8','3'],
  'G5' : ['8','4'],
  'D5' : ['8','5']
}

function getBlock(period) {
  var blockSchedule = []
  for (const [key, value] of Object.entries(blocks)) {
    if (value[1] == period[value[0]]) {
      blockSchedule.push(key)
    }
  }
  return blockSchedule
}

function parseData(classes) {
  var courseInfo = {}
  classes.courses.forEach((course) => {
    teacher = course.teacher.split(' ')[1].replace(',', '') + ' ' + course.teacher.split(' ')[0].replace(',', '')
    course.placement = getBlock(course.placement)
    courseInfo[course.name] = {"Room": course.roomName, "Teacher": teacher, "Period": course.placement}
  })
  schedule[classes.name] = {
    startDate: classes.startDate,
    endDate: classes.endDate,
    "Courses": courseInfo,
  }
}
// wait until we are done logging in
user.on('ready', () => {
  // now that we are logged in...
  // get grades from all courses, returns an array of terms containing clas information (see docs)
  user.getCourses().then((terms) => {
    terms.forEach(parseData)
    console.log(schedule)
    console.log("##########################################################################################")
    console.log(schedule["Q1"])
    console.log(schedule["Q1"].Courses)
    console.log("##########################################################################################")
    console.log(schedule["Q2"])
    console.log(schedule["Q2"].Courses)
    console.log("##########################################################################################")
    console.log(schedule["Q3"])
    console.log(schedule["Q3"].Courses)
    console.log("##########################################################################################")
    console.log(schedule["Q4"])
    console.log(schedule["Q4"].Courses)
    console.log("##########################################################################################")
  })
})


// listen for any errors thrown while logging in
user.on('error', (err) => {
	console.log('Error while Logging in. Bad credentials.' + err)
})