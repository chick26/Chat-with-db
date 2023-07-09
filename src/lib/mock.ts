export const result = '以下是网络路由方案的分解，列出了前三个解决方案：\n' +
    '\n' +
    '1. 伦敦-马赛-吉布提-约翰内斯堡：\n' +
    '   - 子电路1：[LDN2/CU-MRS/CU OTU4-001] [空闲总带宽:69.455G] [时延:17.000]\n' +
    '   - 子电路2：[LDN2/CU-MRS/CU 64S001] [空闲总带宽:9.547G] [时延:未知]\n' +
    '   - 子电路3：[SMW5(亚欧5号海底光缆)] [MRS/CU-DJI/CU 64S001] [空闲总带宽:9.685G] [时延:73.810]\n' +
    '   - 子电路4：[DJI/CU-JHB/CU 16S001] [空闲总带宽:1.014G] [时延:97.600]\n' +
    '\n' +
    '2. 伦敦-巴黎-马赛-吉布提-约翰内斯堡：\n' +
    '   - 子电路1：[LDN/CU-PAR/CU 16S001] [空闲总带宽:1.018G] [预估时延:7]\n' +
    '   - 子电路2：[LDN1/CU-PAR/CU 64S001] [空闲总带宽:6.884G] [时延:7.000]\n' +
    '   - 子电路3：[PAR/CU-MRS/CU OTU4-001] [空闲总带宽:90.0G] [时延:9.160]\n' +
    '   - 子电路4：[ORANGE:LD020118] [空闲总带宽:100.0G] [时延:9.170]\n' +
    '   - 子电路5：[SMW5(亚欧5号海底光缆)] [MRS/CU-DJI/CU 64S001] [空闲总带宽:9.685G] [时延:73.810]\n' +
    '   - 子电路6：[DJI/CU-JHB/CU 16S001] [空闲总带宽:1.014G] [时延:97.600]\n' +
    '\n' +
    '3. 伦敦-法兰克福-马赛-吉布提-约翰内斯堡：\n' +
    '   - 子电路1：[LDN1/CU-FFT2/CU OTU4-001] [空闲总带宽:10.0G] [时延:11.170]\n' +
    '   - 子电路2：[LDN1/CU-FFT2/CU OTU4-002] [空闲总带宽:90.0G] [时延:未知]\n' +
    '   - 子电路3：[FFT2/CU-MRS/CU OTU2-001] [空闲总带宽:9.0G] [时延:1.000]\n' +
    '   - 子电路4：[FFT1/CU-MRS/CU OTU4-002] [空闲总带宽:30.0G] [时延:13.170]\n' +
    '   - 子电路5：[FFT2/CU-MRS/CU OTU4-001] [空闲总带宽:30.0G] [时延:13.240]\n' +
    '   - 子电路6：[FFT2/CU-MRS/CU OTU4-004] [空闲总带宽:50.0G] [预估时延:14]\n' +
    '   - 子电路7：[FFT2/CU-MRS/CU OTU4-003] [空闲总带宽:61.085G] [时延:14.550]\n' +
    '   - 子电路8：[FFT2/CU-MRS/CU 64S001] [空闲总带宽:1.428G] [时延:未知]\n' +
    '   - 子电路9：[SMW5(亚欧5号海底光缆)] [MRS/CU-DJI/CU 64S001] [空闲总带宽:9.685G] [时延:73.810]\n' +
    '   - 子电路10：[DJI/CU-JHB/CU 16S001] [空闲总带宽:1.014G] [时延:97.600]'

export const prompt = `请告诉我从伦敦到约翰内斯堡的传输路由方案，要求速率500M。`

export const sqlQuery = `{"ANode": "伦敦", "ZNode": "约翰内斯堡", "rate": "500M"}`

export const apiResponse = {
  "schemeList": [
    {
      "children": [
        {
          "children": [
            {
              "freeRate": "69.455G",
              "timeDelay": "17.000",
              "id": "370010070000000000294896",
              "label": "[LDN2/CU-MRS/CU OTU4-001] [空闲总带宽:69.455G] [时延:17.000]  "
            },
            {
              "freeRate": "9.547G",
              "timeDelay": "未知",
              "id": "370010070000000000337584",
              "label": "[LDN2/CU-MRS/CU 64S001] [空闲总带宽:9.547G] [时延:未知]  "
            }
          ],
          "id": 2,
          "label": "伦敦-马赛"
        },
        {
          "children": [
            {
              "freeRate": "9.685G",
              "timeDelay": "73.810",
              "id": "370010070000000000337269",
              "label": " [SMW5(亚欧5号海底光缆)] [MRS/CU-DJI/CU 64S001] [空闲总带宽:9.685G] [时延:73.810]  "
            }
          ],
          "id": 3,
          "label": "马赛-吉布提"
        },
        {
          "children": [
            {
              "freeRate": "1.014G",
              "timeDelay": "97.600",
              "id": "370010070000000000337267",
              "label": "[DJI/CU-JHB/CU 16S001] [空闲总带宽:1.014G] [时延:97.600]  "
            }
          ],
          "id": 4,
          "label": "吉布提-约翰内斯堡"
        }
      ],
      "id": "1",
      "label": "伦敦-马赛-吉布提-约翰内斯堡",
      "routePortNum": 4
    },
    {
      "children": [
        {
          "children": [
            {
              "freeRate": "1.018G",
              "timeDelay": "7",
              "id": "370010070000000000294868",
              "label": "[LDN/CU-PAR/CU 16S001] [空闲总带宽:1.018G] [预估时延:7]  "
            },
            {
              "freeRate": "6.884G",
              "timeDelay": "7.000",
              "id": "370010070000000000339849",
              "label": "[LDN1/CU-PAR/CU 64S001] [空闲总带宽:6.884G] [时延:7.000]  "
            }
          ],
          "id": 2,
          "label": "伦敦-巴黎"
        },
        {
          "children": [
            {
              "freeRate": "90.0G",
              "timeDelay": "9.160",
              "id": "370010070000000000346215",
              "label": "[PAR/CU-MRS/CU OTU4-001] [空闲总带宽:90.0G] [时延:9.160]  "
            },
            {
              "freeRate": "100.0G",
              "timeDelay": "9.170",
              "id": "370016890000000002406290",
              "label": "[ORANGE:LD020118] [空闲总带宽:100.0G] [时延:9.170]  "
            }
          ],
          "id": 3,
          "label": "巴黎-马赛"
        },
        {
          "children": [
            {
              "freeRate": "9.685G",
              "timeDelay": "73.810",
              "id": "370010070000000000337269",
              "label": " [SMW5(亚欧5号海底光缆)] [MRS/CU-DJI/CU 64S001] [空闲总带宽:9.685G] [时延:73.810]  "
            }
          ],
          "id": 4,
          "label": "马赛-吉布提"
        },
        {
          "children": [
            {
              "freeRate": "1.014G",
              "timeDelay": "97.600",
              "id": "370010070000000000337267",
              "label": "[DJI/CU-JHB/CU 16S001] [空闲总带宽:1.014G] [时延:97.600]  "
            }
          ],
          "id": 5,
          "label": "吉布提-约翰内斯堡"
        }
      ],
      "id": "1",
      "label": "伦敦-巴黎-马赛-吉布提-约翰内斯堡",
      "routePortNum": 5
    },
    {
      "children": [
        {
          "children": [
            {
              "freeRate": "10.0G",
              "timeDelay": "11.170",
              "id": "370010070000000000341070",
              "label": "[LDN1/CU-FFT2/CU OTU4-001] [空闲总带宽:10.0G] [时延:11.170]  "
            },
            {
              "freeRate": "90.0G",
              "timeDelay": "未知",
              "id": "370010070000000000350795",
              "label": "[LDN1/CU-FFT2/CU OTU4-002] [空闲总带宽:90.0G] [时延:未知]  "
            }
          ],
          "id": 2,
          "label": "伦敦-法兰克福"
        },
        {
          "children": [
            {
              "freeRate": "9.0G",
              "timeDelay": "1.000",
              "id": "370010070000000000328694",
              "label": "[FFT2/CU-MRS/CU OTU2-001] [空闲总带宽:9.0G] [时延:1.000]  "
            },
            {
              "freeRate": "30.0G",
              "timeDelay": "13.170",
              "id": "370010070000000000343838",
              "label": "[FFT1/CU-MRS/CU OTU4-002] [空闲总带宽:30.0G] [时延:13.170]  "
            },
            {
              "freeRate": "30.0G",
              "timeDelay": "13.240",
              "id": "370010070000000000328226",
              "label": "[FFT2/CU-MRS/CU OTU4-001] [空闲总带宽:30.0G] [时延:13.240]  "
            },
            {
              "freeRate": "50.0G",
              "timeDelay": "14",
              "id": "370010070000000000347735",
              "label": "[FFT2/CU-MRS/CU OTU4-004] [空闲总带宽:50.0G] [预估时延:14]  "
            },
            {
              "freeRate": "61.085G",
              "timeDelay": "14.550",
              "id": "370010070000000000345400",
              "label": "[FFT2/CU-MRS/CU OTU4-003] [空闲总带宽:61.085G] [时延:14.550]  "
            },
            {
              "freeRate": "1.428G",
              "timeDelay": "未知",
              "id": "370010070000000000345766",
              "label": "[FFT2/CU-MRS/CU 64S001] [空闲总带宽:1.428G] [时延:未知]  "
            }
          ],
          "id": 3,
          "label": "法兰克福-马赛"
        },
        {
          "children": [
            {
              "freeRate": "9.685G",
              "timeDelay": "73.810",
              "id": "370010070000000000337269",
              "label": " [SMW5(亚欧5号海底光缆)] [MRS/CU-DJI/CU 64S001] [空闲总带宽:9.685G] [时延:73.810]  "
            }
          ],
          "id": 4,
          "label": "马赛-吉布提"
        },
        {
          "children": [
            {
              "freeRate": "1.014G",
              "timeDelay": "97.600",
              "id": "370010070000000000337267",
              "label": "[DJI/CU-JHB/CU 16S001] [空闲总带宽:1.014G] [时延:97.600]  "
            }
          ],
          "id": 5,
          "label": "吉布提-约翰内斯堡"
        }
      ],
      "id": "1",
      "label": "伦敦-法兰克福-马赛-吉布提-约翰内斯堡",
      "routePortNum": 5
    }
  ],
  "resultCode": "0"
}

export const explainResponse = `The breakdown of the routes and the first 2 solutions are as follows: Solution 1: 伦敦-马赛-吉布提-约翰内斯堡 1. 伦敦-马赛: [LDN2/CU-MRS/CU OTU4-001] [空闲总带宽:69.455G] [时延:17.000] 2. 马赛-吉布提: [SMW5(亚欧5号海底光缆)] [MRS/CU-DJI/CU 64S001] [空闲总带宽:9.685G] [时延:73.810] 3. 吉布提-约翰内斯堡: [DJI/CU-JHB/CU 16S001] [空闲总带宽:1.014G] [时延:97.600] Solution 2: 伦敦-巴黎-马赛-吉布提-约翰内斯堡 1. 伦敦-巴黎: [LDN/CU-PAR/CU 16S001] [空闲总带宽:1.018G] [预估时延:7] 2. 巴黎-马赛: [PAR/CU-MRS/CU OTU4-001] [空闲总带宽:90.0G] [时延:9.160] 3. 马赛-吉布提: [SMW5(亚欧5号海底光缆)] [MRS/CU-DJI/CU 64S001] [空闲总带宽:9.685G] [时延:73.810] 4. 吉布提-约翰内斯堡: [DJI/CU-JHB/CU 16S001] [空闲总带宽:1.014G] [时延:97.600]`