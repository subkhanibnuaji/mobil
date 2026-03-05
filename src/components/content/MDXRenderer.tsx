import { MDXRemote } from "next-mdx-remote/rsc";
import Callout from "@/components/mdx/Callout";
import ProsCons from "@/components/mdx/ProsCons";
import CostEstimate from "@/components/mdx/CostEstimate";
import DiagnosticTree from "@/components/mdx/DiagnosticTree";

const components = {
  Callout,
  ProsCons,
  CostEstimate,
  DiagnosticTree,
};

interface MDXRendererProps {
  source: string;
}

export default function MDXRenderer({ source }: MDXRendererProps) {
  return (
    <div className="prose max-w-none">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
