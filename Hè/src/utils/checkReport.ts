import axios from "axios"

async function checkReportDateValidity(currentYear: number, previousMonth: number, userEmail : string): Promise<boolean> {
    try {
      const response = await axios.get("http://localhost:3000/user/registrationDate", {
        params: {
          email: userEmail
        },
      });
      const regYear = response.data.year
      const regMonth = response.data.month
      console.log("DATE DATOSE: " + currentYear + " " + regYear + " " + previousMonth + " " + regMonth)
      
      //if you registered in the current month
      if (currentYear === regYear && (previousMonth + 1) == regMonth) {
        console.log("loop request")
        return false
      }
      return true
    } catch (error) {
      return false
    }
}

export { checkReportDateValidity }