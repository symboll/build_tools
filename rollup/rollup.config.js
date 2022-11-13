import { defineConfig } from 'rollup'
import ts from 'rollup-plugin-typescript2'
import dts from 'rollup-plugin-dts'

export default defineConfig([
  {
    input: "./src/core/index.ts",
    output: [
      {
        file: "dist/index.ems.js",
        format: "es"
      },
      {
        file: "dist/index.cjs.js",
        format: 'cjs'
      },
      {
        file: "dist/index.js",
        format: 'umd',
        name: 'Auxiliary'
      }
    ],
    plugins: [ 
      ts() 
    ]
  },
  {
    input: "./src/core/index.ts",
    output: {
      file: "dist/index.d.ts",
      format: "es"
    },
    plugins: [
      dts()
    ]
  }
])
