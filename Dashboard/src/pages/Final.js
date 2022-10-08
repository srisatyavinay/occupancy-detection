import {Grid, Typography} from '@mui/material';
import * as React from 'react';
import { HeatMap } from '@nivo/heatmap'

function Final({srealdata}) {
    const heatmapgenerator = (row) => {
        let i;
        let j;

        if (!row) { return [] }
        let temp = row.field2.split(',');
        console.log(temp);
        const row1 = temp.map(element => parseFloat(element));
        temp = row.field3.split(',');
        const row2 = temp.map(element => parseFloat(element));
        const heatmap = [];
        for (i = 0; i < 4; i += 1) {
            const data = [];
            for (j = 0; j < 8; j += 1) {
                data.push({ x: `${j}`, y: row1[i * 8 + j] });
            }
            heatmap.push({ id: `${i}`, data });
        }
        for (i = 4; i < 8; i += 1) {
            const data = [];
            for (j = 0; j < 8; j += 1) {
                data.push({ x: `${j}`, y: row2[(i - 4) * 8 + j] });
            }
            heatmap.push({ id: `${i}`, data });
        }
        console.log(heatmap);
        return heatmap;
    }

    const data = heatmapgenerator(srealdata);

    return (
        <>
        <HeatMap
            width={700}
            height={500}
            data={data}
            margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
            valueFormat=">-.2s"
            axisTop={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -90,
                legend: '',
                legendOffset: 46
            }}
            axisRight={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
            }}
            colors={{
                type: 'diverging',
                scheme: 'turbo',
                divergeAt: 0.75,
                minValue: 20,
                maxValue: 30
            }}
            emptyColor="#555555"
            legends={[
                {
                    anchor: 'bottom',
                    translateX: 0,
                    translateY: 30,
                    length: 400,
                    thickness: 8,
                    direction: 'row',
                    tickPosition: 'after',
                    tickSize: 3,
                    tickSpacing: 4,
                    tickOverlap: false,
                    tickFormat: '>-.2s',
                    title: 'Value →',
                    titleAlign: 'start',
                    titleOffset: 4
                }
            ]}
        />
        <Grid container justifyContent="center">
            <Typography variant="h3" sx={{ mb: 5 }}>{`No.of people: ${srealdata.field1}`}</Typography>
        </Grid>
        </>
    );
}

export default Final;