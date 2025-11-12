export function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-16 py-8">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Live Score. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
