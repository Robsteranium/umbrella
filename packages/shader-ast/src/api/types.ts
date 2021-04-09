import type { Index, Swizzle, Sym } from "./nodes";
import type { BoolTerm, FloatTerm, IntTerm, UintTerm } from "./terms";

export type Type =
    | "void"
    | "bool"
    | "bool[]"
    | "float"
    | "float[]"
    | "int"
    | "int[]"
    | "uint"
    | "uint[]"
    | "vec2"
    | "vec2[]"
    | "vec3"
    | "vec3[]"
    | "vec4"
    | "vec4[]"
    | "ivec2"
    | "ivec2[]"
    | "ivec3"
    | "ivec3[]"
    | "ivec4"
    | "ivec4[]"
    | "uvec2"
    | "uvec2[]"
    | "uvec3"
    | "uvec3[]"
    | "uvec4"
    | "uvec4[]"
    | "bvec2"
    | "bvec2[]"
    | "bvec3"
    | "bvec3[]"
    | "bvec4"
    | "bvec4[]"
    | "mat2x2"
    | "mat2x2[]"
    | "mat2x3"
    | "mat2x3[]"
    | "mat2x4"
    | "mat2x4[]"
    | "mat3x2"
    | "mat3x2[]"
    | "mat3x3"
    | "mat3x3[]"
    | "mat3x4"
    | "mat3x4[]"
    | "mat4x2"
    | "mat4x2[]"
    | "mat4x3"
    | "mat4x3[]"
    | "mat4x4"
    | "mat4x4[]"
    | "sampler2D"
    | "sampler2D[]"
    | "sampler3D"
    | "sampler3D[]"
    | "samplerCube"
    | "samplerCube[]"
    | "sampler2DShadow"
    | "sampler2DShadow[]"
    | "samplerCubeShadow"
    | "samplerCubeShadow[]"
    | "isampler2D"
    | "isampler2D[]"
    | "isampler3D"
    | "isampler3D[]"
    | "isamplerCube"
    | "isamplerCube[]"
    | "usampler2D"
    | "usampler2D[]"
    | "usampler3D"
    | "usampler3D[]"
    | "usamplerCube"
    | "usamplerCube[]";

export interface ArrayTypeMap {
    bool: "bool[]";
    float: "float[]";
    int: "int[]";
    uint: "uint[]";
    vec2: "vec2[]";
    vec3: "vec3[]";
    vec4: "vec4[]";
    ivec2: "ivec2[]";
    ivec3: "ivec3[]";
    ivec4: "ivec4[]";
    uvec2: "uvec2[]";
    uvec3: "uvec3[]";
    uvec4: "uvec4[]";
    bvec2: "bvec2[]";
    bvec3: "bvec3[]";
    bvec4: "bvec4[]";
    mat2x2: "mat2x2[]";
    mat3x3: "mat3x3[]";
    mat4x4: "mat4x4[]";
    sampler2D: "sampler2D[]";
    sampler3D: "sampler3D[]";
    samplerCube: "samplerCube[]";
    sampler2DShadow: "sampler2DShadow[]";
    samplerCubeShadow: "samplerCubeShadow[]";
    isampler2D: "isampler2D[]";
    isampler3D: "isampler3D[]";
    isamplerCube: "isamplerCube[]";
    usampler2D: "usampler2D[]";
    usampler3D: "usampler3D[]";
    usamplerCube: "usamplerCube[]";
}

export interface IndexTypeMap {
    "bool[]": "bool";
    "float[]": "float";
    "int[]": "int";
    "uint[]": "uint";
    "vec2[]": "vec2";
    "vec3[]": "vec3";
    "vec4[]": "vec4";
    "ivec2[]": "ivec2";
    "ivec3[]": "ivec3";
    "ivec4[]": "ivec4";
    "uvec2[]": "uvec2";
    "uvec3[]": "uvec3";
    "uvec4[]": "uvec4";
    "bvec2[]": "bvec2";
    "bvec3[]": "bvec3";
    "bvec4[]": "bvec4";
}

export interface MatIndexTypeMap {
    mat2x2: "vec2";
    mat3x3: "vec3";
    mat4x4: "vec4";
}

export type Indexable = keyof IndexTypeMap;

export type Assignable<T extends Type> = Sym<T> | Swizzle<T> | Index<T>;

export type Vec = "vec2" | "vec3" | "vec4";
export type IVec = "ivec2" | "ivec3" | "ivec4";
export type UVec = "uvec2" | "uvec3" | "uvec4";
export type BVec = "bvec2" | "bvec3" | "bvec4";

export type Mat =
    | "mat2x2"
    | "mat2x3"
    | "mat2x4"
    | "mat3x2"
    | "mat3x3"
    | "mat3x4"
    | "mat4x2"
    | "mat4x3"
    | "mat4x4";

export type Sampler =
    | "sampler2D"
    | "sampler3D"
    | "samplerCube"
    | "sampler2DShadow"
    | "samplerCubeShadow"
    | "isampler2D"
    | "isampler3D"
    | "isamplerCube"
    | "usampler2D"
    | "usampler3D"
    | "usamplerCube";

export type Prim = "float" | Vec;
export type Int = "int" | "uint";
export type Comparable = "float" | Int;
export type Numeric = number | FloatTerm | IntTerm | UintTerm;
export type NumericF = number | FloatTerm;
export type NumericI = number | IntTerm;
export type NumericU = number | UintTerm;
export type NumericB = boolean | Numeric | BoolTerm;

export interface PrimTypeMap {
    1: "float";
    2: "vec2";
    3: "vec3";
    4: "vec4";
}
