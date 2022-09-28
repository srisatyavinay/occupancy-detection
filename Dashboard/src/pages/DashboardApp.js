import { Grid, Container, Typography } from '@mui/material';
// components
import { useState, useEffect } from "react";
import { useTheme } from '@mui/material/styles';
import axios from "axios";
import Page from '../components/Page';
import {
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWidgetSummary,
} from '../sections/@dashboard/app';
import Final from './Final';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();
  const [lastid, setLastid] = useState(-1);
  const [realdata, setRealdata] = useState([{ created_at: "2022-09-17T06:44:44Z", entry_id: 848, field1: 1, field2: "25.75,25.00,26.25,25.25,25.50,26.00,26.00,25.75,25.50,25.50,25.50,25.75,25.50,26.00,26.00,25.50,25.75,25.75,26.25,25.75,25.25,25.50,25.50,26.00,25.00,25.75,25.75,25.75,25.75,25.25,26.00,25.25,", field3: "25.25,25.50,25.25,25.50,25.00,25.50,25.50,25.25,25.00,25.25,25.25,25.50,25.75,25.75,25.50,26.00,24.50,25.50,24.75,25.25,25.50,25.75,25.50,25.75,24.75,25.00,24.75,25.00,24.75,25.50,25.25,25.25," }, { created_at: "2022-09-17T06:44:44Z", entry_id: 848, field1: 3, field2: "25.75,25.00,26.25,25.25,25.50,26.00,26.00,25.75,25.50,25.50,25.50,25.75,25.50,26.00,26.00,25.50,25.75,25.75,26.25,25.75,25.25,25.50,25.50,26.00,25.00,25.75,25.75,25.75,25.75,25.25,26.00,25.25,", field3: "25.25,25.50,25.25,25.50,25.00,25.50,25.50,25.25,25.00,25.25,25.25,25.50,25.75,25.75,25.50,26.00,24.50,25.50,24.75,25.25,25.50,25.75,25.50,25.75,24.75,25.00,24.75,25.00,24.75,25.50,25.25,25.25," }, { created_at: "2022-09-17T06:44:44Z", entry_id: 848, field1: 0, field2: "25.75,25.00,26.25,25.25,25.50,26.00,26.00,25.75,25.50,25.50,25.50,25.75,25.50,26.00,26.00,25.50,25.75,25.75,26.25,25.75,25.25,25.50,25.50,26.00,25.00,25.75,25.75,25.75,25.75,25.25,26.00,25.25,", field3: "25.25,25.50,25.25,25.50,25.00,25.50,25.50,25.25,25.00,25.25,25.25,25.50,25.75,25.75,25.50,26.00,24.50,25.50,24.75,25.25,25.50,25.75,25.50,25.75,24.75,25.00,24.75,25.00,24.75,25.50,25.25,25.25," }, { created_at: "2022-09-17T06:44:44Z", entry_id: 848, field1: 2, field2: "25.75,25.00,26.25,25.25,25.50,26.00,26.00,25.75,25.50,25.50,25.50,25.75,25.50,26.00,26.00,25.50,25.75,25.75,26.25,25.75,25.25,25.50,25.50,26.00,25.00,25.75,25.75,25.75,25.75,25.25,26.00,25.25,", field3: "25.25,25.50,25.25,25.50,25.00,25.50,25.50,25.25,25.00,25.25,25.25,25.50,25.75,25.75,25.50,26.00,24.50,25.50,24.75,25.25,25.50,25.75,25.50,25.75,24.75,25.00,24.75,25.00,24.75,25.50,25.25,25.25," }, { created_at: "2022-09-17T06:44:44Z", entry_id: 848, field1: 2, field2: "25.75,25.00,26.25,25.25,25.50,26.00,26.00,25.75,25.50,25.50,25.50,25.75,25.50,26.00,26.00,25.50,25.75,25.75,26.25,25.75,25.25,25.50,25.50,26.00,25.00,25.75,25.75,25.75,25.75,25.25,26.00,25.25,", field3: "25.25,25.50,25.25,25.50,25.00,25.50,25.50,25.25,25.00,25.25,25.25,25.50,25.75,25.75,25.50,26.00,24.50,25.50,24.75,25.25,25.50,25.75,25.50,25.75,24.75,25.00,24.75,25.00,24.75,25.50,25.25,25.25," }, { created_at: "2022-09-17T06:44:44Z", entry_id: 848, field1: 1, field2: "25.75,25.00,26.25,25.25,25.50,26.00,26.00,25.75,25.50,25.50,25.50,25.75,25.50,26.00,26.00,25.50,25.75,25.75,26.25,25.75,25.25,25.50,25.50,26.00,25.00,25.75,25.75,25.75,25.75,25.25,26.00,25.25,", field3: "25.25,25.50,25.25,25.50,25.00,25.50,25.50,25.25,25.00,25.25,25.25,25.50,25.75,25.75,25.50,26.00,24.50,25.50,24.75,25.25,25.50,25.75,25.50,25.75,24.75,25.00,24.75,25.00,24.75,25.50,25.25,25.25," }, { created_at: "2022-09-17T06:44:44Z", entry_id: 848, field1: 0, field2: "25.75,25.00,26.25,25.25,25.50,26.00,26.00,25.75,25.50,25.50,25.50,25.75,25.50,26.00,26.00,25.50,25.75,25.75,26.25,25.75,25.25,25.50,25.50,26.00,25.00,25.75,25.75,25.75,25.75,25.25,26.00,25.25,", field3: "25.25,25.50,25.25,25.50,25.00,25.50,25.50,25.25,25.00,25.25,25.25,25.50,25.75,25.75,25.50,26.00,24.50,25.50,24.75,25.25,25.50,25.75,25.50,25.75,24.75,25.00,24.75,25.00,24.75,25.50,25.25,25.25," }, { created_at: "2022-09-17T06:44:44Z", entry_id: 848, field1: 2, field2: "25.75,25.00,26.25,25.25,25.50,26.00,26.00,25.75,25.50,25.50,25.50,25.75,25.50,26.00,26.00,25.50,25.75,25.75,26.25,25.75,25.25,25.50,25.50,26.00,25.00,25.75,25.75,25.75,25.75,25.25,26.00,25.25,", field3: "25.25,25.50,25.25,25.50,25.00,25.50,25.50,25.25,25.00,25.25,25.25,25.50,25.75,25.75,25.50,26.00,24.50,25.50,24.75,25.25,25.50,25.75,25.50,25.75,24.75,25.00,24.75,25.00,24.75,25.50,25.25,25.25," }, { created_at: "2022-09-17T06:44:44Z", entry_id: 848, field1: 2, field2: "25.75,25.00,26.25,25.25,25.50,26.00,26.00,25.75,25.50,25.50,25.50,25.75,25.50,26.00,26.00,25.50,25.75,25.75,26.25,25.75,25.25,25.50,25.50,26.00,25.00,25.75,25.75,25.75,25.75,25.25,26.00,25.25,", field3: "25.25,25.50,25.25,25.50,25.00,25.50,25.50,25.25,25.00,25.25,25.25,25.50,25.75,25.75,25.50,26.00,24.50,25.50,24.75,25.25,25.50,25.75,25.50,25.75,24.75,25.00,24.75,25.00,24.75,25.50,25.25,25.25," }, { created_at: "2022-09-17T06:44:44Z", entry_id: 848, field1: 2, field2: "25.75,25.00,26.25,25.25,25.50,26.00,26.00,25.75,25.50,25.50,25.50,25.75,25.50,26.00,26.00,25.50,25.75,25.75,26.25,25.75,25.25,25.50,25.50,26.00,25.00,25.75,25.75,25.75,25.75,25.25,26.00,25.25,", field3: "25.25,25.50,25.25,25.50,25.00,25.50,25.50,25.25,25.00,25.25,25.25,25.50,25.75,25.75,25.50,26.00,24.50,25.50,24.75,25.25,25.50,25.75,25.50,25.75,24.75,25.00,24.75,25.00,24.75,25.50,25.25,25.25," }]);
  useEffect(() => {
    const interval = setInterval(() =>
      axios
        .get("https://api.thingspeak.com/channels/1871927/feeds.json?api_key=IAABALKKEYN00I8S&results=10")
        .then((response) => {
          if (response.data.feeds[response.data.feeds.length - 1].entry_id !== lastid) {
            setLastid(response.data.feeds[response.data.feeds.length - 1].entry_id)
            setRealdata(response.data.feeds)
          }
        }), 5000)
    return () => clearInterval(interval)
  });

  useEffect(() => {
    console.log(realdata);
  }, [realdata]);

  const averageReturn = (realdata) => {
    let sum = 0;
    for (let x = 0; x < realdata.length; x += 1) {
      sum += parseInt(realdata[x].field1, 10);
    }
    return (Math.floor(sum / realdata.length))
  }

  const peopleReturn = (realdata) => {
    const sum = [];
    for (let x = 0; x < realdata.length; x += 1) {
      sum.push(parseInt(realdata[x].field1, 10));
    }
    return sum;
  }

  const occuReturn = (realdata) => {
    let sum0 = 0;
    let sum1 = 0;
    let sum2 = 0;
    let sum3 = 0;
    for (let x = 0; x < realdata.length; x += 1) {
      if (parseInt(realdata[x].field1, 10) === 0) {
        sum0 += 1;
      }
      else if (parseInt(realdata[x].field1, 10) === 1) {
        sum1 += 1;
      }
      else if (parseInt(realdata[x].field1, 10) === 2) {
        sum2 += 1;
      }
      else if (parseInt(realdata[x].field1, 10) === 3) {
        sum3 += 1;
      }
    }
    return [{ label: '0 people', value: sum0 }, { label: '1 people', value: sum1 }, { label: '2 people', value: sum2 }, { label: '3 people', value: sum3 }];
  }

  const mostReturn = (realdata) => {
    let sum1 = 0;
    let sum2 = 0;
    let sum3 = 0;
    let sum0 = 0;
    for (let x = 0; x < realdata.length; x += 1) {
      if (parseInt(realdata[x].field1, 10) === 0) {
        sum0 += 1;
      }
      else if (parseInt(realdata[x].field1, 10) === 1) {
        sum1 += 1;
      }
      else if (parseInt(realdata[x].field1, 10) === 2) {
        sum2 += 1;
      }
      else if (parseInt(realdata[x].field1, 10) === 3) {
        sum3 += 1;
      }
    }
    if (sum0 >= sum1 && sum0 >= sum2 && sum0 >= sum3) {
      return 0;
    }
    if (sum1 >= sum0 && sum1 >= sum2 && sum1 >= sum3) {
      return 1;
    }
    if (sum2 >= sum0 && sum2 >= sum1 && sum2 >= sum3) {
      return 2;
    }
    if (sum3 >= sum0 && sum3 >= sum1 && sum3 >= sum2) {
      return 3;
    }
  }

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ mb: 5 }}>
          Occupancy Detection
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="No.of people in the room" total={parseInt(realdata[realdata.length - 1].field1, 10)} icon={'ant-design:bar-chart-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Average no.of people in the room" total={averageReturn(realdata)} color="warning" icon={'ant-design:line-chart-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Most observed occupancy figure" total={mostReturn(realdata)} color="error" icon={'ant-design:rise-outlined'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Number of people visited"
              // subheader="(+43%) than last year"
              chartLabels={[
                '10',
                '9',
                '8',
                '7',
                '6',
                '5',
                '4',
                '3',
                '2',
                '1',
              ]}
              chartData={[
                {
                  name: 'People',
                  type: 'column',
                  fill: 'solid',
                  data: peopleReturn(realdata),
                },
                // {
                //   name: 'Team B',
                //   type: 'area',
                //   fill: 'gradient',
                //   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                // },
                // {
                //   name: 'Team C',
                //   type: 'line',
                //   fill: 'solid',
                //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                // },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="No.of people"
              chartData={occuReturn(realdata)}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Grid container justifyContent="center">
              <Typography variant="h3" sx={{ mb: 5 }}>Heatmaps</Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Final srealdata={realdata[realdata.length - 1]} />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Final srealdata={realdata[realdata.length - 2]} />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Final srealdata={realdata[realdata.length - 3]} />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Final srealdata={realdata[realdata.length - 4]} />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
