import { StyleSheet, View } from "react-native";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryLine, VictoryTheme } from "victory";

const chartData = [
    { month: '10月', income: 120000, expense: 90000, total: 200000 },
    { month: '11月', income: 100000, expense: 95000, total: 210000 },
    { month: '12月', income: 110000, expense: 100000, total: 220000 },
    { month: '2025/1', income: 300000, expense: 120000, total: 400000 },
    { month: '2月', income: 250000, expense: 110000, total: 500000 },
    { month: '3月', income: 400000, expense: 200000, total: 700000 },
    { month: '4月', income: 180000, expense: 120000, total: 750000 },
    { month: '5月', income: 160000, expense: 130000, total: 770000 },
    { month: '6月', income: 170000, expense: 140000, total: 800000 },
];

const barStyles = StyleSheet.create({
    combinedChartBox: { width: '100%', maxWidth: 400, alignSelf: 'center', backgroundColor: '#232936', position: 'relative', marginBottom: 16 },
    barRow: { position: 'absolute', flexDirection: 'row', width: '100%', bottom: 0, left: 0 },
    barGroup: { position: 'absolute', flexDirection: 'row', alignItems: 'flex-end' },
    bar: { borderRadius: 3 },
    line: { position: 'absolute', height: 2, backgroundColor: '#4A90E2', borderRadius: 2 },
    dot: { position: 'absolute', width: 10, height: 10, borderRadius: 5, backgroundColor: '#4A90E2', borderWidth: 2, borderColor: '#fff' },
    label: { color: '#aaa', fontSize: 10, marginTop: 2 },
    xLabelsRow: { position: 'absolute', flexDirection: 'row', justifyContent: 'space-between' },
});

export function VictoryCombinedChart()  {
    return (
        <View style={{ backgroundColor: '#232936', borderRadius: 12, padding: 8, marginBottom: 16 }}>
            <VictoryChart
                height={180}
                width={360}
                padding={{ top: 24, bottom: 40, left: 48, right: 24 }}
                domainPadding={{ x: 24, y: 16 }}
                theme={VictoryTheme.material}
                style={{ background: { fill: '#232936' } }}
            >
                {/* X 軸 */}
                <VictoryAxis
                    tickValues={chartData.map((d) => d.month)}
                    style={{
                        axis: { stroke: '#aaa' },
                        tickLabels: { fill: '#aaa', fontSize: 12, padding: 8 },
                        grid: { stroke: 'none' },
                    }}
                />
                {/* Y 軸 */}
                <VictoryAxis
                    dependentAxis
                    style={{
                        axis: { stroke: '#aaa' },
                        tickLabels: { fill: '#aaa', fontSize: 10 },
                        grid: { stroke: '#444', strokeDasharray: '4,4' },
                    }}
                />
                {/* 收入/支出長條圖 */}
                <VictoryGroup offset={16}>
                    <VictoryBar
                        data={chartData}
                        x="month"
                        y="income"
                        barWidth={12}
                        style={{ data: { fill: '#9F9', borderRadius: 4 } }}
                    />
                    <VictoryBar
                        data={chartData}
                        x="month"
                        y="expense"
                        barWidth={12}
                        style={{ data: { fill: '#F77', borderRadius: 4 } }}
                    />
                </VictoryGroup>
                {/* 總資產折線圖 */}
                <VictoryLine
                    data={chartData}
                    x="month"
                    y="total"
                    style={{ data: { stroke: '#4A90E2', strokeWidth: 2 } }}
                />
            </VictoryChart>
        </View>
    );
}