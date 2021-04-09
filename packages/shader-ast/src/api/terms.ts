import type { Term } from "./nodes";

export type BoolTerm = Term<"bool">;
export type FloatTerm = Term<"float">;
export type IntTerm = Term<"int">;
export type UintTerm = Term<"uint">;

export type Vec2Term = Term<"vec2">;
export type Vec3Term = Term<"vec3">;
export type Vec4Term = Term<"vec4">;

export type IVec2Term = Term<"ivec2">;
export type IVec3Term = Term<"ivec3">;
export type IVec4Term = Term<"ivec4">;

export type UVec2Term = Term<"uvec2">;
export type UVec3Term = Term<"uvec3">;
export type UVec4Term = Term<"uvec4">;

export type BVec2Term = Term<"bvec2">;
export type BVec3Term = Term<"bvec3">;
export type BVec4Term = Term<"bvec4">;

export type Mat2Term = Term<"mat2x2">;
export type Mat23Term = Term<"mat2x3">;
export type Mat24Term = Term<"mat2x4">;
export type Mat32Term = Term<"mat3x2">;
export type Mat3Term = Term<"mat3x3">;
export type Mat34Term = Term<"mat3x4">;
export type Mat42Term = Term<"mat4x2">;
export type Mat43Term = Term<"mat4x3">;
export type Mat4Term = Term<"mat4x4">;

export type Sampler2DTerm = Term<"sampler2D">;
export type Sampler3DTerm = Term<"sampler3D">;
export type SamplerCubeTerm = Term<"samplerCube">;
export type ISampler2DTerm = Term<"isampler2D">;
export type ISampler3DTerm = Term<"isampler3D">;
export type ISamplerCubeTerm = Term<"isamplerCube">;
export type USampler2DTerm = Term<"usampler2D">;
export type USampler3DTerm = Term<"usampler3D">;
export type USamplerCubeTerm = Term<"usamplerCube">;

export type PrimTerm = FloatTerm | Vec2Term | Vec3Term | Vec4Term;
