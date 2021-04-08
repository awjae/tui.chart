# TOAST UI Chart v4 major update planning🏃🏃🏃
TOAST UI Chart is planning a **v4 major update for 2021**. First of all, You can see our **Beta news [here](https://github.com/nhn/tui.chart/discussions/464)!**
<br>
<br>

# ![Toast UI Chart](https://user-images.githubusercontent.com/35218826/37320160-c4d6dec4-26b5-11e8-9a91-79bb2b882410.png)

> 🍞📈 Spread your data on TOAST UI Chart. TOAST UI Chart is Beautiful Statistical Data Visualization library

[![GitHub release](https://img.shields.io/github/release/nhn/tui.chart.svg)](https://github.com/nhn/tui.chart/releases/latest) [![npm](https://img.shields.io/npm/v/tui-chart.svg)](https://www.npmjs.com/package/tui-chart) [![GitHub license](https://img.shields.io/github/license/nhn/tui.chart.svg)](https://github.com/nhn/tui.chart/blob/master/LICENSE) [![PRs welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg)](https://github.com/nhn/tui.chart/pulls) [![code with hearth by NHN](https://img.shields.io/badge/%3C%2F%3E%20with%20%E2%99%A5%20by-NHN-ff1414.svg)](https://github.com/nhn)

## Wrappers
- [toast-ui.vue-chart](https://github.com/nhn/toast-ui.vue-chart): Vue wrapper component is powered by [NHN](https://github.com/nhn).
- [toast-ui.react-chart](https://github.com/nhn/toast-ui.react-chart): React wrapper component is powered by [NHN](https://github.com/nhn).

![chart_animation](https://user-images.githubusercontent.com/35218826/37018282-2a792584-2157-11e8-835f-fac1275d31e0.gif)
![all](https://user-images.githubusercontent.com/35218826/37026890-1e2bcfe0-2173-11e8-9b06-3db329d5f477.png)

## 🚩 Table of Contents
* [Collect statistics on the use of open source](#Collect-statistics-on-the-use-of-open-source)
* [Browser Support](#-browser-support)
* [True Cross Browser Charts](#-true-cross-browser-charts)
* [Features](#-features)
    * [single-charts](#single-charts)
    * [Combo Charts](#combo-charts)
    * [Customize](#customize)
    * [And More From Examples](#and-more-from-examples)
* [Install](#-install)
  * [Via Package Manager](#via-package-manager)
  * [Via Contents Delivery Network (CDN)](#via-contents-delivery-network-cdn)
  * [Download Source Files](#download-source-files)
* [Load](#load)
    * [namespace](#load)
    * [modules](#load)
* [Usage](#-usage)
  * [HTML](#html)
  * [JavaScript](#javascript)
* [Development](#develop)
  * [Setup](#setup)
  * [Develop](#develop)
* [Documents](#-documents)
* [Contributing](#-contributing)
* [TOAST UI Family](#-toast-ui-family)
* [Used By](#-used-by)
* [License](#-license)

## Collect statistics on the use of open source

TOAST UI Chart applies Google Analytics (GA) to collect statistics on the use of open source, in order to identify how widely TOAST UI Chart is used throughout the world. It also serves as important index to determine the future course of projects. location.hostname (e.g. > “ui.toast.com") is to be collected and the sole purpose is nothing but to measure statistics on the usage. To disable GA, use the following `usageStatistics` option when creating charts.

```js
var options = {
  ...
  usageStatistics: false
}

tui.chart.barChart(container, data, options);
```

Or, include tui-code-snippet(**v1.5.0 or later**) and then immediately write the options as follows:

```js
tui.usageStatistics = false;
```

## 🌏 Browser Support
| <img src="https://user-images.githubusercontent.com/1215767/34348387-a2e64588-ea4d-11e7-8267-a43365103afe.png" alt="Chrome" width="16px" height="16px" /> Chrome | <img src="https://user-images.githubusercontent.com/1215767/34348590-250b3ca2-ea4f-11e7-9efb-da953359321f.png" alt="IE" width="16px" height="16px" /> Internet Explorer | <img src="https://user-images.githubusercontent.com/1215767/34348380-93e77ae8-ea4d-11e7-8696-9a989ddbbbf5.png" alt="Edge" width="16px" height="16px" /> Edge | <img src="https://user-images.githubusercontent.com/1215767/34348394-a981f892-ea4d-11e7-9156-d128d58386b9.png" alt="Safari" width="16px" height="16px" /> Safari | <img src="https://user-images.githubusercontent.com/1215767/34348383-9e7ed492-ea4d-11e7-910c-03b39d52f496.png" alt="Firefox" width="16px" height="16px" /> Firefox |
| :---------: | :---------: | :---------: | :---------: | :---------: |
| Yes | 8+ | Yes | Yes | Yes |

## 🌈 True Cross Browser Charts And It's Beautiful!

| IE8 | CHROME |
| --- | --- |
| ![IE8](https://user-images.githubusercontent.com/35218826/37317347-aa1beb1e-26a7-11e8-860c-19274fbc1570.png) | ![CHROME](https://user-images.githubusercontent.com/35218826/37317349-aba19d08-26a7-11e8-997b-3a960c968238.png) |


**No one likes legacy, but sometimes it matters.**  
We started TOAST UI Chart because we could not find a project supporting legacy browsers, maintained reliably, and free for commercial use.

**The visuals of the charts in IE8 are exactly as it looks in Chrome.**  
The TOAST UI Chart guarantees an identical look for all browsers. Draws fast and requires no polyfill, ToastUI uses of the native browser formats, such as SVG and RVML.

**The TOAST UI Chart will continue to support legacy browsers under the MIT license**  
With over 50 releases since June 2015 under MIT License, the TOAST UI Chart is the answer if you have the same requirements as us.

## 🎨 Features

- Intuitive and easy to apply.
- Is an open-source JavaScript library.
- Can be used in legacy browsers including IE8.
- Change the chart in detail using many options and custom themes.


### Single Charts

The TOAST UI Chart provides many types of charts to visualize the various forms of data.

| [Bar](https://nhn.github.io/tui.chart/latest/tutorial-example01-01-bar-chart-basic)<br>[Column](https://nhn.github.io/tui.chart/latest/tutorial-example02-01-column-chart-basic) | [Line](https://nhn.github.io/tui.chart/latest/tutorial-example03-01-line-chart-basic)<br>[Area](https://nhn.github.io/tui.chart/latest/tutorial-example04-01-area-chart-basic)<br>[Radial](https://nhn.github.io/tui.chart/latest/tutorial-example13-01-radial-chart-basic) | [Bubble](https://nhn.github.io/tui.chart/latest/tutorial-example05-01-bubble-chart-basic)<br>[Scatter](https://nhn.github.io/tui.chart/latest/tutorial-example06-01-scatter-chart-basic) | [Pie](https://nhn.github.io/tui.chart/latest/tutorial-example07-01-pie-chart-basic)(General)<br>[Pie](https://nhn.github.io/tui.chart/latest/tutorial-example07-04-pie-chart-donut)(Donut) |
| --- | --- | --- | --- |
| ![2018-03-13 10 33 49](https://user-images.githubusercontent.com/35218826/37317756-151ad090-26aa-11e8-9fa0-74f9d1029bd9.png) | ![2018-03-13 10 44 51](https://user-images.githubusercontent.com/35218826/37318036-9770729c-26ab-11e8-9329-f30bb149e8e7.png) | ![2018-03-13 10 46 31](https://user-images.githubusercontent.com/35218826/37318092-d5c9737c-26ab-11e8-8975-dc6fb56fe99d.png) | ![2018-03-13 10 43 07](https://user-images.githubusercontent.com/35218826/37317996-60189a4a-26ab-11e8-9d5f-bcf5984ee971.png) |

| [Heatmap](https://nhn.github.io/tui.chart/latest/tutorial-example10-01-heatmap-chart-basic)<br>[Treemap](https://nhn.github.io/tui.chart/latest/tutorial-example11-01-treemap-chart-basic)  |  [Map](https://nhn.github.io/tui.chart/latest/tutorial-example09-01-map-chart-world-map) | [Boxplot](https://nhn.github.io/tui.chart/latest/tutorial-example14-01-boxplot-chart-basic) | [Bullet](https://nhn.github.io/tui.chart/latest/tutorial-example15-01-bullet-chart-basic) |
| --- | --- | --- | --- |
| ![2018-03-13 10 47 56](https://user-images.githubusercontent.com/35218826/37318126-07ba5158-26ac-11e8-8a71-3737d2050412.png) | ![2018-03-13 10 51 01](https://user-images.githubusercontent.com/35218826/37318186-76c13c56-26ac-11e8-9e41-5c4ba1bce610.png) | ![2018-03-13 10 59 27](https://user-images.githubusercontent.com/35218826/37318409-a5b03426-26ad-11e8-958f-b497fad5492b.png) | ![2018-03-13 11 01 46](https://user-images.githubusercontent.com/35218826/37318459-f4c7b35e-26ad-11e8-942b-6de4f7f2bb4c.png) |



### Combo Charts

The TOAST UI Chart covers complex data visualization.

| [Column-Line](https://nhn.github.io/tui.chart/latest/tutorial-example08-01-combo-chart-column-and-line) | [Pie-Donut](https://nhn.github.io/tui.chart/latest/tutorial-example08-02-combo-chart-pie-and-donut) | [Line-Area](https://nhn.github.io/tui.chart/latest/tutorial-example08-03-combo-chart-line-and-area) | [Line-Scatter](https://nhn.github.io/tui.chart/latest/tutorial-example08-04-combo-chart-line-and-scatter) |
| --- | --- | --- | --- |
| ![2018-03-13 11 04 48](https://user-images.githubusercontent.com/35218826/37318532-63adea7c-26ae-11e8-9033-d24f7379a0be.png) | ![2018-03-13 11 06 16](https://user-images.githubusercontent.com/35218826/37318577-980a1a3e-26ae-11e8-87d4-ff6d015839b7.png) | ![2018-03-13 11 07 44](https://user-images.githubusercontent.com/35218826/37318606-cbbf59d4-26ae-11e8-8ec8-9766279346cc.png) | ![2018-03-13 11 19 42](https://user-images.githubusercontent.com/35218826/37318993-80728378-26b0-11e8-929e-389995fd9694.png) |


### Customize

Visualize the data in different styles by customizing the details of the charts.

| Various expressions | Custom theme | Stack option  | Diverging option | Group tooltip |
| --- | --- | --- | --- | --- |
| ![2018-03-13 11 43 13](https://user-images.githubusercontent.com/35218826/37319762-bfb4932a-26b3-11e8-90d3-4c87fa62b580.png) | ![2018-03-13 11 40 43](https://user-images.githubusercontent.com/35218826/37319713-9770d11c-26b3-11e8-9199-7590a8beae05.png)  | ![2018-03-13 11 44 15](https://user-images.githubusercontent.com/35218826/37319792-e9af280c-26b3-11e8-9eaf-86bccb260df5.png) |![2018-03-13 11 45 15](https://user-images.githubusercontent.com/35218826/37319832-0f181e6e-26b4-11e8-8970-87bb7c7b5928.png) | ![2018-03-13 11 46 39](https://user-images.githubusercontent.com/35218826/37319863-3a208d62-26b4-11e8-9b0c-1a9f565ba413.png) |
  
### And More From Examples

* [Load Data from a table](https://github.com/nhn/tui.chart/blob/master/docs/wiki/import-chart-data-from-existing-table-element.md)
* [Add data dynamically](https://nhn.github.io/tui.chart/latest/tutorial-example12-01-dynamic-chart-append-and-shift-data-dynamically)
* [Apply themes](https://github.com/nhn/tui.chart/blob/master/docs/wiki/theme.md)
* [Map Data Attribution](https://www.amcharts.com/svg-maps/)

Check out [Example](https://nhn.github.io/tui.chart/latest/tutorial-example01-01-bar-chart-basic) and [wiki](https://github.com/nhn/tui.chart/tree/master/docs/wiki#tutorial) to discover more.

## 💾 Install

The TOAST UI products can be installed by using the package manager or downloading the source directly.
However, we highly recommend using the package manager.

### Via Package Manager

The TOAST UI products are registered in two package managers, [npm](https://www.npmjs.com/) and [bower](https://bower.io/).
Install by using the commands provided by each package manager.
When using npm, be sure [Node.js](https://nodejs.org) is installed in the environment.

#### npm

```sh
$ npm install --save tui-chart # Latest version
$ npm install --save tui-chart@<version> # Specific version
```

#### bower

```sh
$ bower install tui-chart # Latest version
$ bower install tui-chart#<tag> # Specific version
```


### Via Contents Delivery Network (CDN)
The TOAST UI Chart is available over a CDN.

- You can use cdn as below.

```html
<link rel="stylesheet" href="https://uicdn.toast.com/tui.chart/latest/tui-chart.min.css">
<script src="https://uicdn.toast.com/tui.chart/latest/tui-chart.min.js"></script>
```

- The types of distribution files are classified into three types depending on whether or not they exist in the code of the dependency file.
    1. `tui-chart.js` - This is not include dependency modules in the code.
    2. `tui-chart-all.js` - Includes all dependency modules, including 'babel-polyfill', in bundle file code
    3. `tui-chart-polyfill.js` - This includes only babel-polyfill in code.

- Within the download you'll find the following directories

```
tui.chart/
├─ latest
│  ├─ tui-chart.js
│  ├─ tui-chart.min.js
│  ├─ tui-chart-all.js
│  ├─ tui-chart-all.min.js
│  ├─ tui-chart-polyfill.js
│  ├─ tui-chart-polyfill.min.js
│  ├─ tui-chart.css
│  ├─ tui-chart.min.css
│  ├─ maps/
│  │  ├── (china | japan | singapore | south-korea | taiwan | thailand | use | world).js
├─ v3.0.1/
```

### Download Source Files
* [Download bundle files](https://github.com/nhn/tui.chart/tree/master/dist)
* [Download all sources for each version](https://github.com/nhn/tui.chart/releases)


## 🔨 Usage

### HTML

Add the container element where TOAST UI Chart will be created.

``` html
<div id="chart"></div>
```

### JavaScript
#### Load
The TOAST UI Chart can be used by creating an instance with the constructor function. To access the constructor function, import the module using one of the three following methods depending on your environment.

| [Area](https://github.com/nhn/tui.chart/blob/main/docs/en/chart-area.md)                                                                         | [Line](https://github.com/nhn/tui.chart/blob/main/docs/en/chart-line.md)                                                                        | [Bar](https://github.com/nhn/tui.chart/blob/main/docs/en/chart-bar.md)                                                                         | [Column](https://github.com/nhn/tui.chart/blob/main/docs/en/chart-column.md)                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://user-images.githubusercontent.com/35371660/104139606-15ec5b80-53f0-11eb-96f6-c5bc593d9603.png"  width="300" alt='area chart'/> | <img src="https://user-images.githubusercontent.com/35371660/104139669-65328c00-53f0-11eb-9612-c457a0cdaf9f.png" width="300" alt='line chart'/> | <img src="https://user-images.githubusercontent.com/35371660/104140066-d2dfb780-53f2-11eb-8bba-355cb22bc35c.png" width="300" alt='bar chart'/> | <img src="https://user-images.githubusercontent.com/35371660/104139953-1259d400-53f2-11eb-8d48-2a48d4cfe6b2.png"  width="300" alt='column chart'/> |

| [Bullet](https://github.com/nhn/tui.chart/blob/main/docs/en/chart-bullet.md)                                                                      | [BoxPlot](https://github.com/nhn/tui.chart/blob/main/docs/en/chart-boxplot.md)                                                                     | [Treemap](https://github.com/nhn/tui.chart/blob/main/docs/en/chart-treemap.md)                                                                     | [Heatmap](https://github.com/nhn/tui.chart/blob/main/docs/en/chart-heatmap.md)                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://user-images.githubusercontent.com/35371660/104140183-76c96300-53f3-11eb-88c7-49c212d9e31b.png" width="300" alt='bullet chart'/> | <img src="https://user-images.githubusercontent.com/35371660/104140209-a6786b00-53f3-11eb-8ff0-ade619a89ff4.png" width="300" alt='boxplot chart'/> | <img src="https://user-images.githubusercontent.com/35371660/104140267-fd7e4000-53f3-11eb-878a-4eb24b4b83de.png" width="300" alt='treemap chart'/> | <img src="https://user-images.githubusercontent.com/35371660/104140300-243c7680-53f4-11eb-9c92-465355e34211.png" width="300" alt='heatmap chart'/> |

| [Scatter](https://github.com/nhn/tui.chart/blob/main/docs/en/chart-scatter.md)                                                                     | [Bubble](https://github.com/nhn/tui.chart/blob/main/docs/en/chart-bubble.md)                                                                      | [Radar](https://github.com/nhn/tui.chart/blob/main/docs/en/chart-radar.md)                                                                       | [Pie](https://github.com/nhn/tui.chart/blob/main/docs/en/chart-pie.md)                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://user-images.githubusercontent.com/35371660/104156462-6c778b00-542c-11eb-9101-a9df4e48d8db.png" width="300" alt='scatter chart'/> | <img src="https://user-images.githubusercontent.com/35371660/104156347-3508de80-542c-11eb-805e-fca276bc6c5f.png" width="300" alt='bubble chart'/> | <img src="https://user-images.githubusercontent.com/35371660/104140534-176c5280-53f5-11eb-830e-574b05fbf4db.png" width="300" alt='radar chart'/> | <img src="https://user-images.githubusercontent.com/35371660/104140544-2eab4000-53f5-11eb-87c3-d2bc9790fa5b.png" width="300" alt='pie chart'/> |

| [LineArea](https://github.com/nhn/tui.chart/blob/main/docs/en/chart-lineArea.md)                                                                    | [LineScatter](https://github.com/nhn/tui.chart/blob/main/docs/en/chart-lineScatter.md)                                                                 | [ColumnLine](https://github.com/nhn/tui.chart/blob/main/docs/en/chart-columnLine.md)                                                                  | [NestedPie](https://github.com/nhn/tui.chart/blob/main/docs/en/chart-nestedPie.md)                                                                   |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://user-images.githubusercontent.com/35371660/104140692-fc4e1280-53f5-11eb-8ae7-05568ed6f333.png" width="300" alt='lineArea chart'/>| <img src="https://user-images.githubusercontent.com/35371660/104156268-160a4c80-542c-11eb-9893-9adb052727da.png" width="300" alt='lineScatter chart'/> | <img src="https://user-images.githubusercontent.com/35371660/104140778-72527980-53f6-11eb-83ab-ad0883d8593b.png" width="300" alt='columnLine chart'/> | <img src="https://user-images.githubusercontent.com/35371660/104140795-8eeeb180-53f6-11eb-833e-ae1cdb9d8879.png" width="300" alt='nestedPie chart'/> |

| [RadialBar](https://github.com/nhn/tui.chart/blob/main/docs/en/chart-radialBar.md)                                                                    | [Gauge](https://github.com/nhn/tui.chart/blob/main/docs/en/chart-gauge.md)                                                                     |                                                                      |                                                                      |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img width="300" src="https://user-images.githubusercontent.com/43128697/108300194-3ffd1e80-71e3-11eb-988c-f0a56933a4f5.png" alt="radialBar chart"> | <img width="300" alt="gauge chart" src="https://user-images.githubusercontent.com/43128697/110775762-a33e1600-82a2-11eb-82cc-594bf41e9638.png"> | <img width="300" src="https://user-images.githubusercontent.com/43128697/108300188-3ecbf180-71e3-11eb-902c-3814079380cc.png" alt="coming soon"> | <img width="300" src="https://user-images.githubusercontent.com/43128697/108300188-3ecbf180-71e3-11eb-902c-3814079380cc.png" alt="next"> |

- Stack Options(Explained in [each chart guide](https://github.com/nhn/tui.chart/tree/main/docs))
- Diverging Options(Explained in [each chart guide](https://github.com/nhn/tui.chart/tree/main/docs))
- Change Event Detect Type(Explained in [each chart guide](https://github.com/nhn/tui.chart/tree/main/docs))
- [Custom Theme](https://github.com/nhn/tui.chart/tree/main/docs/en/common-theme.md)
- [Custom Tooltip](https://github.com/nhn/tui.chart/blob/main/docs/en/common-tooltip.md)
- [Export `xls`, `csv`, `png`, `jpeg` file](https://github.com/nhn/tui.chart/blob/main/docs/en/common-exportMenu.md)
- [Live Update](https://github.com/nhn/tui.chart/blob/main/docs/en/common-liveUpdate-options.md)
- [Responsive Layout](https://github.com/nhn/tui.chart/blob/main/docs/en/common-responsive-options.md)

In addition, a variety of powerful features can be found on the demo page below. 👇👇👇

## 🐾 Examples

- [Line Chart](http://nhn.github.io/tui.chart/latest/tutorial-example08-01-line-chart-basic)
- [Area Chart](http://nhn.github.io/tui.chart/latest/tutorial-example01-01-area-chart-basic)
- [LineArea Chart](http://nhn.github.io/tui.chart/latest/tutorial-example14-01-LineArea-chart-basic)
- [Bar Chart](http://nhn.github.io/tui.chart/latest/tutorial-example02-01-bar-chart-basic)
- [Column Chart](http://nhn.github.io/tui.chart/latest/tutorial-example06-01-column-chart-basic)
- [ColumnLine Chart](http://nhn.github.io/tui.chart/latest/tutorial-example13-01-columnLine-chart-basic)
- [Bullet Chart](http://nhn.github.io/tui.chart/latest/tutorial-example05-01-bullet-chart-baic)
- [BoxPlot Chart](http://nhn.github.io/tui.chart/latest/tutorial-example03-01-boxPlot-chart-basic)
- [Treemap Chart](http://nhn.github.io/tui.chart/latest/tutorial-example12-01-treemap-chart-basic)
- [Heatmap Chart](http://nhn.github.io/tui.chart/latest/tutorial-example07-01-heatmap-chart-basic)
- [Scatter Chart](http://nhn.github.io/tui.chart/latest/tutorial-example11-01-scatter-chart-basic)
- [LineScatter Chart](http://nhn.github.io/tui.chart/latest/tutorial-example15-01-LineScatter-chart-basic)
- [Bubble Chart](http://nhn.github.io/tui.chart/latest/tutorial-example04-01-bubble-chart-basic)
- [Pie Chart](http://nhn.github.io/tui.chart/latest/tutorial-example09-01-pie-chart-basic)
- [NestedPie Chart](http://nhn.github.io/tui.chart/latest/tutorial-example16-01-NestedPie-chart-basic)
- [Radar Chart](http://nhn.github.io/tui.chart/latest/tutorial-example10-01-radar-chart-basic)
- [RadialBar Chart](http://nhn.github.io/tui.chart/latest/tutorial-example18-01-radialBar-chart-basic)
- [Gauge Chart](http://nhn.github.io/tui.chart/latest/tutorial-example20-01-gauge-chart-basic)

Here are more [examples](http://nhn.github.io/tui.chart/latest/tutorial-example01-01-area-chart-basic) and play with TOAST UI Chart!

## 🔧 Pull Request Steps

TOAST UI products are open source, so you can create a pull request(PR) after you fix issues.
Run npm scripts and develop yourself with the following process.

### Setup

Fork `develop` branch into your personal repository.
Clone to local computer. 
Install node modules.
Before starting development, check for any errors.

```sh
$ git clone https://github.com/{username}/tui.chart.git
$ cd tui.chart
$ npm install
$ npm run test
```

### Develop

Let's start development!
<<<<<<< HEAD
Run a server and see the code reflected.
Add test cases and then make them green.
=======
You can develop UI through webpack-dev-server or storybook, and you can write tests through Jest.
Don't miss adding test cases and then make green rights.
>>>>>>> 32f3c2863730df8fd2a46242d48d72382398a292

#### Run webpack-dev-server

```sh
$ npm run serve
<<<<<<< HEAD
$ npm run serve:ie8 # Run on Internet Explorer 8
```

#### Run karma test

```sh
$ npm run test
```

### Pull Request

Before creating a PR, test and check for any errors.
If there are no errors, then commit and push!

For more information, please refer to the Contributing section.

```sh
$ npm run deploy
$ npm run test
```

## 📙 Documents
* [Getting Started](https://github.com/nhn/tui.chart/blob/master/docs/wiki/getting-started.md)
* [Tutorials](https://github.com/nhn/tui.chart/blob/master/docs/wiki/README.md)
* [APIs](https://nhn.github.io/tui.chart/latest/)

See the older versions of API page on the [releases page](https://github.com/nhn/tui.chart/releases).

## 💬 Contributing
* [Code of Conduct](https://github.com/nhn/tui.chart/blob/master/CODE_OF_CONDUCT.md)
* [Contributing guideline](https://github.com/nhn/tui.chart/blob/master/CONTRIBUTING.md)
* [Issue guideline](https://github.com/nhn/tui.chart/blob/master/docs/ISSUE_TEMPLATE.md)
* [Commit convention](https://github.com/nhn/tui.chart/blob/master/docs/COMMIT_MESSAGE_CONVENTION.md)

## 🍞 TOAST UI Family
* [TOAST UI Editor](https://github.com/nhn/tui.editor)
* [TOAST UI Grid](https://github.com/nhn/tui.grid)
* [TOAST UI Calendar](https://github.com/nhn/tui.calendar)
* [TOAST UI Image-Editor](https://github.com/nhn/tui.image-editor)
* [TOAST UI Components](https://github.com/nhn)

## 🚀 Used By
* [TOAST Cloud - Total Cloud Service](https://www.toast.com/service/)
* [NHN - ToastCam](https://cam.toast.com/ko/#/)
* [TOAST Dooray! - Collaboration Service (Project, Messenger, Mail, Calendar, Drive, Wiki, Contacts)](https://dooray.com)
* [NHN - Smart Downloader](https://docs.toast.com/ko/Game/Smart%20Downloader/ko/console-guide/)
* [NHN - Gamebase](https://docs.toast.com/ko/Game/Gamebase/ko/oper-analytics/)
* [NHN Edu - iamTeacher](https://teacher.iamservice.net)


## 📜 License
This software is licensed under the [MIT](https://github.com/nhn/tui.chart/blob/master/LICENSE) © [NHN](https://github.com/nhn).


=======
```

#### Run storybook

```sh
$ npm run storybook
```

#### Run test

```sh
$ npm run test
```

### Pull Request

Before PR, check to test lastly and then check any errors.
If it has no error, commit and then push it!

For more information on PR's step, please see links of Contributing section.

## 💬 Contributing

- [Code of Conduct](https://github.com/nhn/tui.chart/blob/main/CODE_OF_CONDUCT.md)
- [Contributing guideline](https://github.com/nhn/tui.chart/blob/main/CONTRIBUTING.md)
- [Issue guideline](https://github.com/nhn/tui.chart/tree/main/.github/ISSUE_TEMPLATE)
- [Commit convention](https://github.com/nhn/tui.chart/blob/main/docs/COMMIT_MESSAGE_CONVENTION.md)

## 🌏 Browser Support

| <img src="https://user-images.githubusercontent.com/1215767/34348387-a2e64588-ea4d-11e7-8267-a43365103afe.png" alt="Chrome" width="16px" height="16px" /> Chrome | <img src="https://user-images.githubusercontent.com/1215767/34348590-250b3ca2-ea4f-11e7-9efb-da953359321f.png" alt="IE" width="16px" height="16px" /> Internet Explorer | <img src="https://user-images.githubusercontent.com/1215767/34348380-93e77ae8-ea4d-11e7-8696-9a989ddbbbf5.png" alt="Edge" width="16px" height="16px" /> Edge | <img src="https://user-images.githubusercontent.com/1215767/34348394-a981f892-ea4d-11e7-9156-d128d58386b9.png" alt="Safari" width="16px" height="16px" /> Safari | <img src="https://user-images.githubusercontent.com/1215767/34348383-9e7ed492-ea4d-11e7-910c-03b39d52f496.png" alt="Firefox" width="16px" height="16px" /> Firefox |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                               Yes                                                                                |                                                                                   10+                                                                                   |                                                                             Yes                                                                              |                                                                               Yes                                                                                |                                                                                Yes                                                                                 |

## 🍞 TOAST UI Family

- [TOAST UI Editor](https://github.com/nhn/tui.editor)
- [TOAST UI Grid](https://github.com/nhn/tui.grid)
- [TOAST UI Calendar](https://github.com/nhn/tui.calendar)
- [TOAST UI Image-Editor](https://github.com/nhn/tui.image-editor)
- [TOAST UI Components](https://github.com/nhn)

## 🚀 Used By

- [TOAST Cloud - Total Cloud Service](https://www.toast.com/service/)
- [NHN - ToastCam](https://cam.toast.com/ko/#/)
- [TOAST Dooray! - Collaboration Service (Project, Messenger, Mail, Calendar, Drive, Wiki, Contacts)](https://dooray.com)
- [NHN - Smart Downloader](https://docs.toast.com/ko/Game/Smart%20Downloader/ko/console-guide/)
- [NHN - Gamebase](https://docs.toast.com/ko/Game/Gamebase/ko/oper-analytics/)
- [NHN Edu - iamTeacher](https://teacher.iamservice.net)
- [HANGAME](https://www.hangame.com/)
- [Payco](https://www.payco.com/)

## 📜 License

This software is licensed under the [MIT](https://github.com/nhn/tui.chart/blob/main/LICENSE) © [NHN](https://github.com/nhn).
>>>>>>> 32f3c2863730df8fd2a46242d48d72382398a292
