import { useMask } from '@react-input/mask';
import { Input } from './input';


export default function CPFInput(props: React.ComponentProps<"input">) {
  const inputRef = useMask({ mask: '&&&.&&&.&&&-&&', replacement: '&' });
  
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.-]/g, '');
  };
  
  return <Input
    {...props}
    placeholder="Digite seu CPF" 
    inputMode="numeric"
    ref={inputRef}
    onInput={handleInput}
  />;
}